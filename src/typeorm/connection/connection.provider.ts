import { createConnection } from "typeorm";
import {ormConfig} from "../config/orm.config";

export const connectionProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(ormConfig)
}