import { Module } from "@nestjs/common";
import { _UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ModelsModule } from "../typeorm/models/models.module";

@Module({
    providers: [_UserService],
    controllers: [UserController],
    imports: [ModelsModule],
    exports: [_UserService]
})
export class UserModule {}