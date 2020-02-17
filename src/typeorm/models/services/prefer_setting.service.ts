import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { PreferSetting } from "../entities/prefer_setting.entity";

type PreferSettingTypes = keyof PreferSetting;

@Injectable()
export class PreferSettingService {
    constructor(
        @Inject("PREFERSETTING_REPOSITORY")
        private readonly preferSettingRepository: Repository<PreferSetting>
    ) {}

    /**
     * 为用户创建偏好设置（均为默认）并返回偏好设置ID
     */
    async createDefaultPreferSetting(): Promise<number> {
        let v = await this.preferSettingRepository.insert({
            theme_id: 1,
            tone_if: 1,
            tone_id: 1,
            desktop_reminder:1 
        });
        return v.identifiers[0].prefer_setting_id;
    }

    /**
     * 更新偏好设置信息
     * @param option 
     * @param preferSettingContent 
     */
    async updatePreferSetting<T extends PreferSettingTypes,N extends PreferSettingTypes>(
        option: Pick<PreferSetting,T>, 
        preferSettingContent: Pick<PreferSetting,N>
        ) {
        await this.preferSettingRepository.update(option,preferSettingContent);
    }

    /**
     * 检查偏好设置是否已经存在
     * @param checkOption 
     */
    async checkPreferSettingExistence<T>(checkOption: T): Promise<boolean> {
        const count = await this.preferSettingRepository.count(checkOption);
        return count === 0 ? false : true;
    }

    async getPreferSetting<T extends keyof PreferSetting>(
        option: Pick<PreferSetting,T>
    ) {
        const settingMes = await this.preferSettingRepository.findOne(option);
        return settingMes;
    }
}