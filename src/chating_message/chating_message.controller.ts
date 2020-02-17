import { Controller, Get, Body, Query } from "@nestjs/common";
import { ChatingMessageService } from "./chating_message.service";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

@Controller('message')
export class ChatingMessageController {
    constructor(
        private readonly chatingMessageService: ChatingMessageService
    ) {}
    /**
     * 游客获取默认群组的历史消息
     */
    @Get('/history/guest')
    async getDefaultGroupHistoryMessages(
        @Query('page') page: string,
        @Query('limit') limit: string
    ) {
        return this.chatingMessageService.getDefaultGroupHistoryMessages(
            Number(page),
            Number(limit)
        )
    }
    /**
     * 已登录用户获取指定dialog的历史消息
     * @param dialogId 
     * @param page 
     * @param limit 
     */
    @Get('history')
    async getHistoryMessages(
        @Query('dialogId') dialogId: string,
        @Query('page') page: string,
        @Query('limit') limit: string
    ) {
        return await this.chatingMessageService.getHistoryMessages(
            Number(dialogId),
            Number(page),
            Number(limit)
        )
    }
}