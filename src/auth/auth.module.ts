import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { ModelsModule } from "../typeorm/models/models.module";


@Module({
    imports: [ModelsModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}