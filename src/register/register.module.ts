import { Module } from "@nestjs/common";

import {RegisterController} from "./register.controller";
import {RegisterService} from "./register.service";

import {ModelsModule} from "../typeorm/models/models.module";
import { ChatingMessageModule } from "../chating_message/chating_message.module";

@Module({
    controllers: [RegisterController],
    providers: [RegisterService],
    imports: [ModelsModule,ChatingMessageModule]
})
export class RegisterModule {}