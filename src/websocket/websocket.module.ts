import { Module } from "@nestjs/common";

import { ModelsModule } from "../typeorm/models/models.module";
import { ChatingMessageModule } from "../chating_message/chating_message.module";
import { FriendsModule } from "../friends/friends.module";
import { EventsGateway } from "./websocket.gateway";
import { WebsocketService } from "./websocket.service";
import { GroupModule } from "../group/group.module";




@Module({
    providers: [EventsGateway,WebsocketService],
    exports: [EventsGateway],
    imports: [ModelsModule,ChatingMessageModule,FriendsModule,GroupModule]
})
export class WebsocketModule {}