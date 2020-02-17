import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./gruop.controller";
import { ModelsModule } from "../typeorm/models/models.module";
import { UserModule } from "../user/user.module";

@Module({
    providers: [GroupService],
    controllers: [GroupController],
    imports: [ModelsModule,UserModule],
    exports: [GroupService]
})
export class GroupModule {}