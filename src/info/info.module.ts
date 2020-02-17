import { Module } from "@nestjs/common";
import { InfoController } from "./info.controller";
import { _InfoService } from "./info.service";

import {ModelsModule} from "../typeorm/models/models.module";

@Module({
    controllers: [InfoController],
    providers: [_InfoService],
    imports: [ModelsModule]
})
export class InfoModule {}