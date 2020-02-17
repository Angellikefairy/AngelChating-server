import { Module } from "@nestjs/common";

import {ConnectionModule} from "../connection/connection.module";
import {modelsProviders} from "./models.providers";
import {modelsServices} from "./models.services";

@Module({
    imports: [ConnectionModule],
    providers: [...modelsProviders,...modelsServices],
    exports: [...modelsServices]
})
export class ModelsModule {}