import { Controller, Get, Query } from "@nestjs/common";
import { _InfoService } from "./info.service";

@Controller('info')
export class InfoController {
    constructor(
        private readonly infoService: _InfoService
    ) {}
    /**
     * 获取好友申请和好友申请状态通知
     * @param id 
     * @param skip 
     * @param take 
     */
    @Get('friendship')
    async getFriendshipInfos(
        @Query('id') id: string,
        @Query('page') skip: string,
        @Query('limit') take: string
        ) {
        return await this.infoService.getFriendshipInfos(id,Number(skip)-1,Number(take));
    }

}