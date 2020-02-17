import {Module} from "@nestjs/common";

import {connectionProvider} from "./connection.provider";

@Module({
    providers: [connectionProvider],
    exports: [connectionProvider]
})
export class ConnectionModule {}