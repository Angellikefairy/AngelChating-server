import { Module } from "@nestjs/common";
import { _DialogService } from "./dialog.service";
import { ModelsModule } from "../typeorm/models/models.module";
import { DialogController } from "./dialog.controller";

@Module({
    providers: [_DialogService],
    exports: [_DialogService],
    imports: [ModelsModule],
    controllers: [DialogController]
})
export class DialogModule {}