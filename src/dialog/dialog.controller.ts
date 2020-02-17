import { Controller, Get, Query } from "@nestjs/common";
import { _DialogService } from "./dialog.service";

@Controller()
export class DialogController {
    constructor(
        private readonly _dialogService: _DialogService
    ) {}
    /**
     * 分页获取dialog列表
     * @param userId 
     * @param page 
     * @param limit 
     */
    @Get('dialog-list')
    async getDialogList(
        @Query('userId') userId: string,
        @Query('page') page: string,
        @Query('limit') limit: string 
    ) {
        return await this._dialogService.getDialogListByUserId(userId,Number(page),Number(limit))
    }
    /**
     * 获取dialog信息
     * @param dialogFromId 
     * @param dialogTargetId 
     */
    @Get('dialog')
    async getDialogMes(
        @Query('dialogFromId') dialogFromId: string,
        @Query('dialogTargetId') dialogTargetId: string
    ) {
        const dialogMes = await this._dialogService.checkAndGetDialogMes({
            dialog_from_id: dialogFromId,
            dialog_target_id: dialogTargetId
        })
        return {
            error_code: 0,
            data: {
                dialogMes
            }
        }
    }
}