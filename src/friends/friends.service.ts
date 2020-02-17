import { Injectable} from "@nestjs/common";
import { Socket } from "socket.io";

import {CustomWsException} from "../excption/customException";

import {UserService, UserBasicMes} from "../typeorm/models/services/user.service";
import {FriendshipService} from "../typeorm/models/services/friendship.service";
import {SocketService} from "../typeorm/models/services/socket.service";
import {InfoService} from "../typeorm/models/services/info.service";
import { Friendship } from "../typeorm/models/entities/friendship.entity";
import { DialogService } from "../typeorm/models/services/dialog.service";
import {_UserService} from "../user/user.service"
import { User } from "../typeorm/models/entities/user.entity";

var cnchar = require('cnchar');

interface AddFriendMes {
    fromUserId: string;
    targetUserName: string;
    addFriendTime: string;
    validation: string;
}
interface AgreeFriendMes {
    agreed: boolean;
    fromUserId: string;
    targetUserId: string;
    message: string;
}

@Injectable()
export class FriendsService {
    constructor(
        private readonly userService: UserService,
        private readonly friendshipService: FriendshipService,
        private readonly socketService: SocketService,
        private readonly infoService: InfoService,
        private readonly dialogService: DialogService,
        private readonly _userService: _UserService
    ) {}

    /**
     * 获取好友列表
     * @param userId 
     */
    async getFriendsList(userId: User['user_id']) {
        await this._userService.checkUser({
            user_id: userId
        })
        const allFriendsIds = await this.getAllFriendsIds(userId);
        const allFriendsMes = await this.getAllFriendsMes(allFriendsIds);
        const friendsList = this.classifyFriendsByChar(allFriendsMes);
        return {
            error_code: 0,
            data: {
                userId,
                frinedsCounts: allFriendsIds.length,
                friendsList
            }
        }
    }

    /**
     * 根据首字母进行分类（非26个大写字母则分到#）
     * @param allFriendsMes 
     */
    classifyFriendsByChar(allFriendsMes: Array<UserBasicMes>) {
        const friendsCharMap: Map<string,Array<UserBasicMes>> = new Map();
        allFriendsMes.forEach(friendMes => {
            const firstLetter: string = cnchar.spell(friendMes.user_name,'array','first')[0].toLocaleUpperCase();
            const pattern = /[A-Z]/g;
            if(pattern.test(firstLetter)) {
                this.solveCharMap(friendsCharMap,firstLetter,friendMes);
            }
            else {
                this.solveCharMap(friendsCharMap,'#',friendMes);
            }
        })
        const friendsList: {[char: string]: UserBasicMes[]} = {};
        friendsCharMap.forEach((friendsMes,char)=>{
            // 将数组内的好友根据unicode进行排序
            this.sortFriends(friendsMes);
            friendsList[char] = friendsMes;
        })
        return friendsList;
    }

    solveCharMap(friendsCharMap: Map<string,Array<UserBasicMes>>,char: string,friendMes: UserBasicMes) {
        if(friendsCharMap.has(char)) {
            friendsCharMap.get(char).push(friendMes);
        }
        else {
            friendsCharMap.set(char,[friendMes]);
        }
    }

    /**
     * 根据好友好友name的Unicode进行排序
     */
    sortFriends(allFriendsMes: Array<UserBasicMes>) {
        allFriendsMes.sort((friendA,friendB)=>{
            if(friendA.user_name < friendB.user_name) {
                return -1;
            }
            else if(friendA.user_name === friendB.user_name) {
                return 0;
            }
            else return 1;
        })
    }

    /**
     * 获取所有好友的基本信息
     * @param allFriendsIds 
     */
    async getAllFriendsMes(allFriendsIds: Array<User['user_id']>) {
        const friendsMesPromises = allFriendsIds.map(async friendId => {
            return await this._userService.getUserMes({
                user_id: friendId
            })
        })
        return Promise.all(friendsMesPromises);
    }

    /**
     * 获取所有好友的ID
     * @param userId 
     */
    async getAllFriendsIds(userId: User['user_id']): Promise<Array<User['user_id']>> {
        const friendshipMess: Array<Friendship> = await this.friendshipService.getFriendshipMes({
            where: [
                {
                    from_user_id: userId
                },
                {
                    to_user_id: userId
                }
            ]
        })
        const friendsIds: Array<User['user_id']> = [];
        friendshipMess.forEach(friendshipMes => {
            if(friendshipMes.from_user_id === userId) {
                friendsIds.push(friendshipMes.to_user_id);
            }
            else friendsIds.push(friendshipMes.from_user_id);
        })
        return friendsIds;
    }

    /**
     * 通过用户名添加好友（第一次向该用户名申请作为好友/申请请求被拒绝后再次申请）
     * @param socket 
     * @param mes 
     */
    async addFriend(socket: Socket, mes: AddFriendMes): Promise<any> {
        const datetime = new Date().toLocaleString();
        const {fromUserId,targetUserName} = mes;
        let {validation} = mes;
        const {user_name: fromUserName, user_avatar: fromUserAvatar} = await this.userService.getUserBasicMes({
            user_id: fromUserId
        })
        if(fromUserName === targetUserName) {
            throw new CustomWsException("addFriendException","您不能与自身创建好友关系");
        }
        if(! await this.userService.checkUserExistence({
            user_name: targetUserName
        })) {
            throw new CustomWsException("addFriendException","目标用户名不存在");
        }
        const targetUserMes = await this.userService.getUserBasicMes({
            user_name: targetUserName
        });
        const {user_id: targetUserId, user_socketId: targetUserSocketId} = targetUserMes;

        // 处理验证消息，当验证消息为空时，将验证消息设置为'请求添加好友'
        validation = validation === '' ? `${fromUserName}` : validation;

        if(await this.checkAddFriendPermission(fromUserId,targetUserId) &&
            await this.checkAddFriendPermission(targetUserId,fromUserId)
        ) {

            // 直接创建好友关系（已同意）
            await this.friendshipService.createFriendship({
                from_user_id: fromUserId,
                to_user_id: targetUserId,
                add_friend_time: datetime,
                agree_time: datetime,
                friendship_state: 1,
                friendship_type: 0,
                top_if: 0
            })

            await this.dialogService.createDialog({
                dialog_id: undefined,
                dialog_from_id: fromUserId,
                dialog_target_id: targetUserId,
                last_message_id: undefined,
                dialog_last_time: datetime
            },{
                dialog_id: undefined,
                dialog_from_id: targetUserId,
                dialog_target_id: fromUserId,
                last_message_id: undefined,
                dialog_last_time: datetime
            })

            // 对方在线
            if(await this.userService.checkUserState({
                user_name: targetUserName
            })) {
                // 获取目标用户的socketID
                const {socket_id: targetSocketId} = await this.socketService.getSocketMes({
                    _id: targetUserSocketId
                })
                // 向目标用户立即发送好友申请通知
                socket.to(targetSocketId).emit('addFriendInfo', {
                    fromUserId,
                    fromUserName,
                    fromUserAvatar,
                    validation
                })
            }

        }

        return {
            error_code: 0,
            data: {
                message: "你们已经是好友了，快来一起聊天吧",
                addFriendTime: datetime,
                agreeTime: datetime,
                fromUserId,
                fromUserName,
                targetUserMes
            }
        }
    }

    /**
     * 同意/拒绝好友申请请求
     * @param socket 
     * @param mes 
     */
    async agreeFriend(socket: Socket, mes: AgreeFriendMes): Promise<any> {
        const {agreed, fromUserId, targetUserId, message} = mes;
        const agreeTime = new Date().toLocaleString();
        let friendshipState: number;
        const {user_name: fromUserName, user_avatar: fromUserAvatar} = await this.userService.getUserBasicMes({
            user_id: fromUserId
        })
        const {user_name: targetUserName} = await this.userService.getUserBasicMes({
            user_id: targetUserId
        })

        agreed === true ? friendshipState = 1 : friendshipState = 2;
        await this.friendshipService.updateFriendship({
            from_user_id: targetUserId,
            to_user_id: fromUserId
        }, {
            agree_time: agreeTime,
            friendship_state: friendshipState
        })

        // 当双方都同意添加为好友后，增加双方的dialog信息
        if(agreed === true) {
            await this.dialogService.createDialog({
                dialog_id: undefined,
                dialog_from_id: fromUserId,
                dialog_target_id: targetUserId,
                last_message_id: undefined,
                dialog_last_time: agreeTime
            },{
                dialog_id: undefined,
                dialog_from_id: targetUserId,
                dialog_target_id: fromUserId,
                last_message_id: undefined,
                dialog_last_time: agreeTime
            })
        } 

        // 对方在线
        if(await this.userService.checkUserState({
            user_id: targetUserId
        })) {
            const {user_socketId: targetUserSocketId} = await this.userService.getUserBasicMes({
                user_id: targetUserId
            })
            const {socket_id: targetSocketId} = await this.socketService.getSocketMes({
                _id: targetUserSocketId
            })
            socket.to(targetSocketId).emit('addFriendStateInfo',{
                agreed,
                agreeTime,
                fromUserId,
                fromUserName,
                fromUserAvatar,
                targetUserId,
                targetUserName
            })
        }
        // 当对方不在线时，将是否同意好友请求进行持久化
        else {
            await this.infoService.createInfo({
                info_id: undefined,
                info_from_id: fromUserId,
                info_to_id: targetUserId,
                info_type: 2,
                info_content: agreed === true ? '已同意' : '已拒绝',
                info_content_type: 'text',
                info_created_time: agreeTime,
                info_state: 0
            })
        }

        
        return {
            error_code: 0,
            data: {
                agreed,
                agreeTime,
                message: agreed === true ? "已成功同意该好友请求" : "已成功拒绝该好友请求"
            }
        }
    }

    /**
     * 查询是否允许向该用户发出添加好友请求
     * @param fromUserId 
     * @param userId 
     */
    async checkAddFriendPermission(fromUserId: string, userId: string): Promise<boolean> {
        const friendshipMes: Friendship = (await this.friendshipService.getFriendshipMes({
            from_user_id: fromUserId,
            to_user_id: userId 
        }))[0];
        // 好友关系存在（已申请/已同意/已拒绝）
        if(friendshipMes) {
            if(friendshipMes.friendship_state === 0) {
                throw new CustomWsException("addFriendException","您已经向该用户发出过好友申请");
            }
            else if(friendshipMes.friendship_state === 1) {
                throw new CustomWsException("addFriendException","你们已经是好友了哦");
            }
        }
        return true;
    }
}