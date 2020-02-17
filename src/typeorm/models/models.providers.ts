import { Connection } from "typeorm";

import { User } from "./entities/user.entity";
import {Group} from "./entities/_group.entity";
import {Socket} from "./entities/socket.entity";
import { Expression } from "./entities/expression.entity";
import {Theme} from "./entities/theme.entity";
import {ThemeType} from "./entities/theme_type.entity";
import {Tone} from "./entities/tone.entity";
import {Message} from "./entities/message.entity";
import {PreferSetting} from "./entities/prefer_setting.entity";
import {Friendship} from "./entities/friendship.entity";
import {GroupRelationship} from "./entities/group_relationship.entity";
import {ExpressionCollection} from "./entities/expression_collection.entity";
import {RandomAvatars} from "./entities/random_avatars.entity";
import {Info} from "./entities/info.entity";
import { Dialog } from "./entities/dialog.entity";



export const modelsProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "GROUP_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Group),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "SOCKET_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Socket),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "EXPRESSION_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Expression),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "THEME_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Theme),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "THEMETYPE_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(ThemeType),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "TONE_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Tone),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "MESSAGE_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Message),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "PREFERSETTING_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(PreferSetting),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "FRIENDSHIP_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Friendship),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "GROUPRELATIONSHIP_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(GroupRelationship),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "EXPRESSIONCOLLECTION_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(ExpressionCollection),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "RANDOMAVATARS_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(RandomAvatars),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "INFO_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Info),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: "DIALOG_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Dialog),
        inject: ['DATABASE_CONNECTION']
    },
]