import {ConnectionOptions} from "typeorm";

import {User} from "../models/entities/user.entity";
import {Group} from "../models/entities/_group.entity";
import {Socket} from "../models/entities/socket.entity";
import { Expression } from "../models/entities/expression.entity";
import {Theme} from "../models/entities/theme.entity";
import {ThemeType} from "../models/entities/theme_type.entity";
import {Tone} from "../models/entities/tone.entity";
import {Message} from "../models/entities/message.entity";
import {PreferSetting} from "../models/entities/prefer_setting.entity";
import {Friendship} from "../models/entities/friendship.entity";
import {GroupRelationship} from "../models/entities/group_relationship.entity";
import {ExpressionCollection} from "../models/entities/expression_collection.entity";
import {RandomAvatars} from "../models/entities/random_avatars.entity";
import {Info} from "../models/entities/info.entity";
import {Dialog} from "../models/entities/dialog.entity";

export const ormConfig: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "zjb13777838499",
    database: "chating",
    entities: [
        User,
        Group,
        Socket,
        Expression,
        Theme,
        ThemeType,
        Tone,
        Message,
        PreferSetting,
        Friendship,
        GroupRelationship,
        ExpressionCollection,
        RandomAvatars,
        Info,
        Dialog
    ],
    synchronize: true
}
