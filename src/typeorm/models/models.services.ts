import { UserService } from "./services/user.service";
import { RandomAvatarsService } from "./services/random_avatars.service";
import { _GroupService } from "./services/_group.service";
import { GroupRelationshipService } from "./services/group_relationship.service";
import { PreferSettingService } from "./services/prefer_setting.service";
import { SocketService } from "./services/socket.service";
import { ExpressionService } from "./services/expression.service";
import { MessageService } from "./services/message.service";
import { FriendshipService } from "./services/friendship.service";
import { InfoService } from "./services/info.service";
import { DialogService } from "./services/dialog.service";


export const modelsServices = [
    UserService, 
    RandomAvatarsService, 
    _GroupService,
    GroupRelationshipService,
    PreferSettingService,
    SocketService,
    ExpressionService,
    MessageService,
    FriendshipService,
    InfoService,
    DialogService
]