import { Module } from "@nestjs/common";
import { UserSettingController } from "./userSetting.controller";
import { UserPreferSettingService } from "./userPrefferSetting.service";
import { ModelsModule } from "../typeorm/models/models.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [UserSettingController],
    providers: [UserPreferSettingService],
    imports: [ModelsModule,UserModule]
})
export class UserSettingModule {}