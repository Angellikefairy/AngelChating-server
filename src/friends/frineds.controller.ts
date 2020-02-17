import { Controller, Get, Query } from "@nestjs/common";
import { FriendsService } from "./friends.service";

@Controller()
export class FriedsController {
    constructor(
        private readonly friendsService: FriendsService
    ) {}

    @Get('friendsList')
    async getFriendsList(
        @Query('userId') userId: string
    ) {
        return await this.friendsService.getFriendsList(userId);
    }
}