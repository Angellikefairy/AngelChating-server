import { Controller, Patch, Body, Get, Query } from "@nestjs/common";
import { UserPreferSettingService } from "./userPrefferSetting.service";

@Controller('user-setting')
export class UserSettingController {
    constructor(
        private readonly userPrefferSetting: UserPreferSettingService
    ) {}

    @Get('prefer-setting')
    async getPreferSetting(
        @Query('userId') userId: string
    ) {
        return await this.userPrefferSetting.getSettingMes(userId);
    }

    @Patch('prefer-setting')
    async updatePreferSetting(
        @Body('userId') userId: string,
        @Body('newSetting') newSetting: any 
    ) {
        return await this.userPrefferSetting.updateSetting(userId,newSetting);
    }
}