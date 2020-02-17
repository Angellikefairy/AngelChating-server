import { Module } from "@nestjs/common";

import { FriendsService } from "./friends.service";
import {ModelsModule} from "../typeorm/models/models.module";
import { UserModule } from "../user/user.module";
import { FriedsController } from "./frineds.controller";

@Module({
    providers: [FriendsService],
    imports: [ModelsModule,UserModule],
    exports: [FriendsService],
    controllers: [FriedsController]
})
export class FriendsModule {}