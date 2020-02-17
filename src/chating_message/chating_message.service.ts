import { Injectable, HttpStatus } from "@nestjs/common";
import { Socket } from "socket.io";

import {MessageService} from "../typeorm/models/services/message.service";
import {UserService} from "../typeorm/models/services/user.service";
import {SocketService} from "../typeorm/models/services/socket.service";
import {CustomWsException} from "../excption/customException";
import { _GroupService } from "../typeorm/models/services/_group.service";


import { Group } from "../typeorm//models/entities/_group.entity";
import { Message } from "../typeorm/models/entities/message.entity";
import { DialogService } from "../typeorm/models/services/dialog.service";
import { _DialogService } from "../dialog/dialog.service";
import { GroupService } from "../group/group.service";
import { Dialog } from "../typeorm/models/entities/dialog.entity";

@Injectable()
export class ChatingMessageService {
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService,
        private readonly socketService: SocketService,
        private readonly _groupService: _GroupService,
        private readonly dialogService: DialogService,
        private readonly _dialogService: _DialogService,
        private readonly  groupService: GroupService
    ) {}

    /**
     * 已登录用户通过dialogId分页获取经过处理后的历史消息
     * @param userId 
     */
    async getHistoryMessages(dialogId: number,page: number,limit: number) {
        const dialog = await this._dialogService.checkAndGetDialogMes({
            dialog_id: dialogId
        });
        const {
            dialog_from_id: dialogFromId,
            dialog_target_id: dialogTargetId
        } = dialog;
        const dialogTargetType: string = await this._dialogService.getDialogTargetType(dialog);
        const historyMesLimit = await this.getHistoryMessageByTargetType(dialogTargetType,dialog,{
            skip: (page-1) * limit,
            take: limit,
            order: {
                "message_created_time": "DESC"
            }
        });
        const historyMesAll = await this.getHistoryMessageByTargetType(dialogTargetType,dialog);
        const allMessageCount = historyMesAll.length;
        const historyMessages = await this.resolveHistoryMessage(historyMesLimit);
        return {
            error_code: 0,
            data: {
                curPage: page,
                messageNum: historyMesLimit.length,
                pageSum: Math.floor(allMessageCount/limit) + 1,
                historyMessages
            }
        }
    }

    async getDefaultGroupHistoryMessages(page: number,limit: number) {
        const defaultGroup = await this._groupService.getDefaultGroup();
        const {group_id: defaultGroupId} = defaultGroup;
        const historyMesLimit = await this.messageService.findMessageByOption({
            where: {
                message_to_id: defaultGroupId
            },
            order: {
                message_created_time: "DESC"
            },
            skip: (page-1) * limit,
            take: limit
        })
        const resolveHistoryMessage = await this.resolveHistoryMessage(historyMesLimit);
        const allMessageCount: number = (await this.messageService.findMessageByOption({
            message_to_id: defaultGroupId
        })).length;
        return {
            error_code: 0,
            data: {
                curPage: page,
                messageNum: historyMesLimit.length,
                pageSum: Math.floor(allMessageCount/limit) + 1,
                historyMessages: resolveHistoryMessage
            }
        }
    }

    // 发送消息（需要将所有信息进行持久化）
    async sendMessage(mes: Message, socket: Socket): Promise<any> {
        const {
            message_from_id: messageFromId,
            message_to_id: messageToId,
            message_type: messageType,
            message_content: messageContent,
            message_content_type: messageContentType
        } = mes;
        mes.message_created_time = new Date().toLocaleString();
        // 在线消息
        mes.message_state = 1;

        let messageId: number;

        let messageTarget;

        const {
            user_name: messageFromName,
            user_avatar: messageFromAvatar,
            user_state: messageFromState
        } = await this.userService.getUserBasicMes({
            user_id: messageFromId
        })
        const messageCreatedTime = new Date().toLocaleString();
        // 私聊
        if(messageType === 0) {
            const exitence: boolean =  await this.userService.checkUserExistence({
                user_id: messageToId
            })
            if(!exitence) {
                throw new CustomWsException("messageException","目标用户不存在");
            }
            const userBasicMes = await this.userService.getUserBasicMes({
                user_id: messageToId
            })
            if(userBasicMes.user_state === 0) {
                // 当目标用户离线时，将消息转为离线消息
                mes.message_state = 0;
            }
            const targetUserBasicMes = await this.userService.getUserBasicMes({
                user_id: messageToId
            })
            const {
                user_socketId: userSocketId,
                user_avatar: messageToAvatar,
                user_name: messageToName,
                user_state: messageToState
            } = targetUserBasicMes;
            const targetSocketId: string = (await this.socketService.getSocketMes({
                _id: userSocketId
            })).socket_id;
            // 将消息进行持久化存储（在提示用户对方不在线前执行）
            messageId = await this.messageService.createMessage(mes);
            messageTarget = {
                messageToId,
                messageToAvatar,
                messageToName,
                messageToState
            }
            socket.to(targetSocketId).emit('messageFromFriend',{
                messageFromUser: {
                    messageFromId,
                    messageFromName,
                    messageFromAvatar,
                    messageFromState
                },
                messageTarget: messageTarget,
                messageId,
                messageContent,
                messageContentType,
                messageType,
                messageCreatedTime
            });
        }
        // 群聊
        else if(messageType === 1) {
            if(!(await this._groupService.checkGroupExistence({
                group_id: messageToId
            }))) {
                throw new CustomWsException("messageException","目标群组不存在");
            }
            else {
                // 将消息进行持久化存储
                messageId = await this.messageService.createMessage(mes);
                const groupMes: Group = await this._groupService.getGroupMes({
                    group_id: messageToId
                })
                const {
                    group_name: groupName,
                    group_avatar: groupAvatar
                } = groupMes;
                messageTarget = {
                    messageToId,
                    messageToAvatar: groupAvatar,
                    messageToName: groupName,
                    messageToState: 1
                }
                socket.to(groupName).emit('groupMemberMessage',{
                    messageFromUser: {
                        messageFromId,
                        messageFromName,
                        messageFromAvatar,
                        messageFromState
                    },
                    messageTarget: messageTarget,
                    messageId,
                    messageContent,
                    messageContentType,
                    messageType,
                    messageCreatedTime
                });
            }
        }



        // 对于消息发送者来说将dialog表中相关对话中最后一条信息更新为此信息，如果没有对话则创建对话
        await this._dialogService.updateDialogMes({
            dialog_from_id: messageFromId,
            dialog_target_id: messageToId
        },{
            dialog_id: undefined,
            dialog_from_id: messageFromId,
            dialog_target_id: messageToId,
            last_message_id: messageId,
            dialog_last_time: messageCreatedTime
        },{
            last_message_id: messageId,
            dialog_last_time: messageCreatedTime
        });

        // 对于消息接收者来说，只适用于私聊
        if(messageType === 0) {
            await this._dialogService.updateDialogMes({
                dialog_from_id: messageToId,
                dialog_target_id: messageFromId
            },{
                dialog_id: undefined,
                dialog_from_id: messageToId,
                dialog_target_id: messageFromId,
                last_message_id: messageId,
                dialog_last_time: messageCreatedTime
            },{
                last_message_id: messageId,
                dialog_last_time: messageCreatedTime
            });
        }
        // 如果是群聊，则更新所有在群聊中成员的对话信息
        else {
            const groupMembers = await this.groupService.getGroupMembersId(messageToId);
            groupMembers.map(async userId => {
                await this._dialogService.updateDialogMes({
                    dialog_from_id: userId,
                    dialog_target_id: messageToId
                },{
                    dialog_id: undefined,
                    dialog_from_id: userId,
                    dialog_target_id: messageToId,
                    last_message_id: messageId,
                    dialog_last_time: messageCreatedTime
                },{
                    last_message_id: messageId,
                    dialog_last_time: messageCreatedTime
                });
            })
        }

        return {
            error_code: 0,
            data: {
                message: '消息已成功发送',
                chatingMessageMes: {
                    messageFromUser: {
                        messageFromId,
                        messageFromName,
                        messageFromAvatar,
                        messageFromState
                    },
                    messageTarget: messageTarget,
                    messageId,
                    messageContent,
                    messageContentType,
                    messageType,
                    messageCreatedTime
                }
            }
        }
    }

    /**
     * 通过指定条件获取相关message中的最后一条消息
     * @param id 
     */
    async getLastMessageMesByOption<T>(option: T): Promise<Message> {
        const messageMes: Message = (await this.messageService.findMessageByOption({
            where: option,
            order: {
                message_created_time: 'DESC'
            },
            skip: 0,
            take: 1
        }))[0];
        return messageMes;
    }
    /**
     * 通过指定条件获取messages
     * @param option 
     */
    async getMessagesByOption<T>(option: T): Promise<Array<Message>> {
        return await this.messageService.findMessageByOption(option);
    }

    /**
     * 根据区分对话目标类型来分页获取历史聊天记录
     * @param dialogTargetType 
     * @param dialog 
     * @param extraOption 
     */
    async getHistoryMessageByTargetType(
        dialogTargetType: string,
        dialog: Dialog,
        extraOption?: object
    ) {
        const {
            dialog_from_id: dialogFromId,
            dialog_target_id: dialogTargetId
        } = dialog;
        let userOption = {
            // 使用or运算符，历史消息要么是自己发给对方的，要么是对方发给自己的
            where: [{
                message_from_id: dialogFromId,
                message_to_id: dialogTargetId
            },{
                message_from_id: dialogTargetId,
                message_to_id: dialogFromId
            }]
        }
        let groupOption = {
            where: {
                message_to_id: dialogTargetId
            }
        };
        if(extraOption) {
            userOption = Object.assign(userOption,extraOption);
            groupOption = Object.assign(groupOption,extraOption);
        }
        if(dialogTargetType === 'user') {
            return await this.getMessagesByOption(userOption);
        }
        else {
            return await this.getMessagesByOption(groupOption);
        }
    }
    /**
     * 处理历史消息
     * @param historyMessages 
     */
    async resolveHistoryMessage(historyMessages: Array<Message>) {
        const promiseHistoryMessages = historyMessages.map(async message => {
            let messageFromMes,messageToMes;
            const {
                message_id: messageId,
                message_from_id: messageFromId,
                message_to_id: messageToId,
                message_type: messageType,
                message_content: messageContent,
                message_content_type: messageContentType,
                message_created_time: messageCreatedTime,
                message_state: messageState
            } = message;
            // 私聊
            if(message.message_type === 0) {
                messageFromMes = await this.userService.getUserBasicMes({
                    user_id: messageFromId
                })
                messageToMes = await this.userService.getUserBasicMes({
                    user_id: messageToId
                })
                messageToMes = {
                    targetId: messageToMes.user_id,
                    targetName: messageToMes.user_name,
                    targetAvatar: messageToMes.user_avatar,
                    targetState: messageToMes.user_state
                }
            }
            else {
                messageFromMes = await this.userService.getUserBasicMes({
                    user_id: messageFromId
                })
                messageToMes = await this._groupService.getGroupMes({
                    group_id: messageToId
                })
                messageToMes = {
                    targetId: messageToMes.group_id,
                    targetName: messageToMes.group_name,
                    targetAvatar: messageToMes.group_avatar,
                    targetState: 1
                }
            }
            messageFromMes = {
                fromId: messageFromMes.user_id,
                fromName: messageFromMes.user_name,
                fromAvatar: messageFromMes.user_avatar,
                fromState: messageFromMes.user_state
            }
            return {
                messageId,
                messageFromMes,
                messageToMes,
                messageType,
                messageContent,
                messageContentType,
                messageCreatedTime,
                messageState
            }
        })
        return Promise.all(promiseHistoryMessages);
    }
}