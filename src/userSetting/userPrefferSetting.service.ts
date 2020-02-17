import { Injectable } from "@nestjs/common";
import {UserSettingService} from "./userSetting.service";
import { PreferSetting } from "../typeorm/models/entities/prefer_setting.entity";

@Injectable()
export class UserPreferSettingService extends UserSettingService {

    /**
     * 获取用户的偏好设置ID
     * @param userId 
     */
    async getPrefferSettingId(userId: string) {
        const userBasicMes = await this.userService.getUserMes({
            user_id: userId
        })
        const preferSettingId = userBasicMes.user_preferSetting_id;
        return preferSettingId;
    }

    async getSettingMes(userId: string) {
        const preferSettingId = await this.getPrefferSettingId(userId);
        const settingMes = await this.preferSettingService.getPreferSetting({
            prefer_setting_id: preferSettingId
        })
        return {
            error_code: 0,
            data: {
                userId,
                preferSettingMes: settingMes
            }
        }
    }

    /**
     * 更新用户的偏好设置
     * @param userId 
     * @param updateContent 
     */
    async updateSetting<T extends keyof PreferSetting>(
        userId: string,
        updateContent: Pick<PreferSetting,T>
    ) {
        const preferSettingId = await this.getPrefferSettingId(userId);
        await this.preferSettingService.updatePreferSetting({
            prefer_setting_id: preferSettingId
        }, updateContent)
        return {
            error_code: 0,
            data: {
                message: '偏好设置更新成功'
            }
        }
    }
}