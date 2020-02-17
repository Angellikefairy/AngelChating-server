import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { _GroupService } from "../typeorm/models/services/_group.service";
import { UserService, UserBasicMes } from "../typeorm/models/services/user.service";
import { RandomAvatarsService } from "../typeorm/models/services/random_avatars.service";
import { GroupRelationshipService } from "../typeorm/models/services/group_relationship.service";

import { Group } from "../typeorm//models/entities/_group.entity";
import { User } from "../typeorm/models/entities/user.entity";
import { _UserService } from "../user/user.service";
import { GroupRelationship } from "../typeorm/models/entities/group_relationship.entity";

interface GroupMembersMes extends UserBasicMes {
    groupMemberType: GroupRelationship['group_member_type']
}

@Injectable()
export class GroupService {
    constructor(
        private readonly _groupService: _GroupService,
        private readonly userService: UserService,
        private readonly randomAvatarsService: RandomAvatarsService,
        private readonly groupRelationshipService: GroupRelationshipService,
        private readonly _userService: _UserService
    ) {}

    /**
     * 获取用户的群组列表
     * @param userId 
     */
    async getGroupList(userId: User['user_id']) {
        await this._userService.checkUser({
            user_id: userId
        })
        const groupList = await this.getUserGroupsMes(userId);
        return {
            error_code: 0,
            data: {
                userId,
                groupCounts: groupList.length,
                groupList
            }
        }
    }
    /**
     * 获取群组中的成员列表
     * @param groupId 
     */
    async getGroupMembers(groupId: Group['group_id']) {
        await this.checkGroup(groupId);
        const groupMembersIds = await this.getGroupMembersId(groupId);
        const groupMembersMes = await this.getGroupMembersMes(groupMembersIds,groupId);
        const groupMes = await this.getGroupMes(groupId);
        return {
            error_code: 0,
            data: {
                groupId,
                groupMes,
                groupMembersCount: groupMembersIds.length,
                groupMembersMes
            }
        }
    }

    /**
     * 创建群聊
     * @param groupName 
     * @param groupManagerId 
     * @param groupType 
     */
    async createGroup(
        groupName: string,
        groupManagerId: string,
        groupType: number
    ) {
        if(!(await this.userService.checkUserExistence({
            user_id: groupManagerId
        }))) {
            throw new HttpException('该用户为无效用户，无法创建群组',HttpStatus.FORBIDDEN);
        }
        else if (await this._groupService.checkGroupExistence({
            group_name: groupName
        })) {
            throw new HttpException('该群组名已经存在，无法创建群组',HttpStatus.FORBIDDEN);
        }
        else {
            // 获取一张随机图片作为群组头像
            const groupAvatar: string = await this.randomAvatarsService.getRandomAvatarUrl();
            const groupRegTime: Date = new Date();
            // 创建群组
            const groupMes: Group = await this._groupService.createGroup({
                group_id: undefined,
                group_name: groupName,
                group_manager_id: groupManagerId,
                group_avatar: groupAvatar,
                group_reg_time: groupRegTime.toLocaleString(),
                group_type: groupType
            })
            const {
                group_id: groupId,
            } = groupMes;
            // 将群主与群组关系建立
            await this.groupRelationshipService.createGroupRelationship({
                user_id: groupManagerId,
                group_id: groupId,
                top_if: 0,
                group_member_type: '群主'
            })
            return {
                error_code: 0,
                data: {
                    message: '群组创建成功',
                    groupMes: {
                        groupId,
                        groupName,
                        groupManagerId,
                        groupAvatar,
                        groupRegTime,
                        groupType
                    }
                }
            }
        }
    }
    /**
     * 获取群聊中的成员id
     * @param groupId 
     */
    async getGroupMembersId(groupId: string): Promise<Array<User['user_id']>> {
        const groupRelationships = await this.groupRelationshipService.getgroupRelationships({
            group_id: groupId
        })
        return groupRelationships.map(groupRelationship => {
            return groupRelationship.user_id;
        })
    }
    /**
     * 获取用户的所有群组信息
     * @param userId 
     */
    async getUserGroupsMes(userId: User['user_id']): Promise<Array<Group>> {
        const groupRelationships = await this.groupRelationshipService.getgroupRelationships({
            user_id: userId
        })
        const promiseGroup: Array<Promise<Group>> = groupRelationships.map(async groupRelationship => {
            const groupId = groupRelationship.group_id;
            return await this.getGroupMes(groupId);
        })
        return Promise.all(promiseGroup);
    }
    /**
     * check群组，当群组不存在时抛出错误
     * @param groupId 
     */
    async checkGroup(groupId: Group['group_id']) {
        const groupExistence = await this._groupService.checkGroupExistence({
            group_id: groupId
        })
        if(!groupExistence) {
            throw new HttpException('该群组不存在或已被解散',HttpStatus.FORBIDDEN);
        }
    }
    /**
     * 获取群组中所有成员的基本信息以及成员在群聊中的成员类型(群主/管理员/普通)
     * @param groupMembersIds 
     */
    async getGroupMembersMes(groupMembersIds: Array<User['user_id']>,groupId: Group['group_id']) {
        const mesPromise: Promise<UserBasicMes>[] = groupMembersIds.map(async groupMembersId => {
            const userMes = await this._userService.getUserMes({
                user_id: groupMembersId
            })
            const groupMemberType = await (await this.getGroupRelationMes(groupMembersId,groupId)).group_member_type;
            const groupMembersMes: GroupMembersMes = {...userMes,groupMemberType};
            return groupMembersMes;
            
        })
        return Promise.all(mesPromise);
    }
    /**
     * 获取群组的基本信息
     * @param groupId 
     */
    async getGroupMes(groupId: Group['group_id']) {
        return await this._groupService.getGroupMes({
            group_id: groupId
        })
    }

    /**
     * 获取指定成员在指定群组的信息
     * @param userId 
     * @param groupId 
     */
    async getGroupRelationMes(userId: User['user_id'], groupId: Group['group_id']) {
        return (await this.groupRelationshipService.getgroupRelationships({
            user_id: userId,
            group_id: groupId
        }))[0]
    }
}