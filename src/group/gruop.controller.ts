import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { GroupService } from "./group.service";

@Controller()
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) {}
    /**
     * 创建群聊
     * @param groupName 
     * @param groupManagerId 
     * @param groupType 
     */
    @Post('group')
    async createGroup(
        @Body('groupName') groupName: string,
        @Body('groupManagerId') groupManagerId: string,
        @Body('groupType') groupType: number
    ) {
        return await this.groupService.createGroup(groupName,groupManagerId,groupType);
    }

    @Get('groupList')
    async getGroupList(
        @Query('userId') userId: string
    ) {
        return await this.groupService.getGroupList(userId);
    }

    @Get('groupMembers')
    async getGroupMembers(
        @Query('groupId') groupId: string
    ) {
        return await this.groupService.getGroupMembers(groupId);
    }
}