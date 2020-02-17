import { Module } from "@nestjs/common";

import { RegisterModule } from "./register/register.module";
import { LoginModule } from "./login/login.module";
import { ModelsModule } from "./typeorm/models/models.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { ChatingMessageModule } from "./chating_message/chating_message.module";
import { InfoModule } from "./info/info.module";
import { FriendsModule } from "./friends/friends.module";
import { GroupModule } from "./group/group.module";
import { UserModule } from "./user/user.module";
import { DialogModule } from "./dialog/dialog.module";
import { UploadModule } from "./upload/upload.module";
import { UserSettingModule } from "./userSetting/userSetting.module";


@Module({
    imports: [
        ModelsModule,
        RegisterModule,
        LoginModule,
        WebsocketModule,
        ChatingMessageModule,
        InfoModule,
        FriendsModule,
        GroupModule,
        UserModule,
        DialogModule,
        UploadModule,
        UserSettingModule
    ],
    exports: [],
    providers: [],
    controllers: []
})
export class AppModule { }