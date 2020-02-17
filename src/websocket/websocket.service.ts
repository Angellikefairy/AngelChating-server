import { Injectable, HttpException, forwardRef, Inject } from "@nestjs/common";
import { Socket, Server } from "socket.io";

import { SocketService } from "../typeorm/models/services/socket.service";
import { UserService } from "../typeorm//models/services/user.service";
import {ChatingMessageService} from "../chating_message/chating_message.service";
import {CustomWsException} from "../excption/customException";
import { _GroupService } from "../typeorm/models/services/_group.service";
import { Group } from "../typeorm/models/entities/_group.entity";
import { EventsGateway } from "./websocket.gateway";
import {defaultGroup} from "../config/config";
import { Message } from "../typeorm/models/entities/message.entity";
import { GroupService } from "../group/group.service";



@Injectable()
export class WebsocketService {
    constructor(
        private readonly socketService: SocketService,
        private readonly userService: UserService,
        private readonly _groupService: _GroupService,
        private readonly chatingMessageService: ChatingMessageService,
        private readonly groupService: GroupService,
        @Inject(forwardRef(() => EventsGateway))
        private readonly websocketGateway: EventsGateway
    ) {}

    /**
     * 通过指定房间名加入聊天室
     * @param socket 
     * @param roomName 
     */
    async joinChatingRoom(socket: Socket,roomName: string) {
        return await new Promise((resolve,reject) => {
            socket.join(roomName,async err => {
                if(err) {
                    reject(err);
                    throw new CustomWsException('joinRoomException','加入聊天室失败');
                }
                else {
                    console.log('rooms',socket.rooms);
                    const groupMes: Group = await this._groupService.getGroupMes({
                        group_name: roomName
                    })
                    const {
                        group_id: groupId,
                        group_avatar: groupAvatar,
                        group_type: groupType
                    } = groupMes;
                    const roomUserNum = await this.websocketGateway.getClientsInChatingRoom(roomName);
                    console.log('roomUserNum',roomUserNum);
                    resolve({
                            message: `加入聊天室成功`,
                            groupId,
                            groupName: roomName,
                            groupAvatar,
                            groupType,
                            roomUserNum
                    });
                }
            })
        })
    }

    /**
     * 更新已登录用户的socket信息
     * @param socketId 
     * @param clientIp 
     * @param userId 
     */
    async updateSocketMes(socketId: string,clientIp: string,userId: string) {
        const userSocketId = (await this.userService.getUserBasicMes({
            user_id: userId
        })).user_socketId;
        await this.socketService.updateSocket({
            _id: userSocketId
        },{
            socket_id: socketId,
            ip: clientIp
        })
    }
    /**
     * 游客加入默认群组
     * @param socket 
     */
    async guestJoinRoom(socket: Socket) {
        const joinMes = await this.joinChatingRoom(socket,defaultGroup.groupName);
        const {group_id: groupId} = await this._groupService.getDefaultGroup();
        const lastMessage = await this.chatingMessageService.getLastMessageMesByOption({
            message_to_id: groupId
        })
        const {message_from_id: messageFromId} = lastMessage;
        const {user_name: userName} = await this.userService.getUserBasicMes({
            user_id: messageFromId
        });
        (lastMessage as any).message_from_name = userName;
        return {
            error_code: 0,
            data: {
                joinMes,
                lastMessage
            }
        };
    }

    /**
     * 用户加入其所有的聊天室
     * @param socket 
     * @param userId 
     */
    async userJoinRooms(socket: Socket, userId: string) {
        const userGroupsMes = await this.groupService.getUserGroupsMes(userId);
        userGroupsMes.forEach(group => {
            socket.join(group.group_name,(err) => {
                if(err) {
                    throw new CustomWsException('joinRoomException','加入聊天室失败');
                }
            })
        })
    }
}