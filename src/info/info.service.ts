import { Injectable } from "@nestjs/common";

import {InfoService as InfoEntityService} from "../typeorm/models/services/info.service";
import {UserService} from "../typeorm/models/services/user.service";
import {Info} from "../typeorm/models/entities/info.entity";


@Injectable()
export class _InfoService {
    constructor(
        private readonly infoEntityService: InfoEntityService,
        private readonly userService: UserService
    ) {}

    async getFriendshipInfos(id: string, skip: number, take: number): Promise<any> {
        const addFriendInfos = await this.getAddFriendInfos(id,skip,take);
        const addriendStateInfos = await this.getAddFriendStateInfos(id,skip,take);
        return {
            error_code: 0,
            data: {
                id,
                addFriendInfos,
                addriendStateInfos
            }
        };
    }

    async getAddFriendInfos(id: string, skip: number, take: number): Promise<any> {
        return await this.getFriendshipInfosByInfoType(id,skip,take,1);
    }

    async getAddFriendStateInfos(id: string, skip: number, take: number): Promise<any> {
        return await this.getFriendshipInfosByInfoType(id,skip,take,2);
    }

    async getFriendshipInfosByInfoType(id: string, skip: number, take: number,infoType: number): Promise<any> {
        let notReadCount = 0;
        const infos: Array<Info> = await this.infoEntityService.getInfosByOption({
            where: {
                info_to_id: id,
                info_type: infoType,
            },
            skip,
            take
        })
        const mapInfos = infos.map(async (value: Info,index) => {
            if(value.info_state === 0) notReadCount++;
            const {
                info_id: infoId,
                info_from_id: fromUserId,
                info_content: infoContent,
                info_content_type: infoContentType,
                info_created_time: infoCreatedTime,
                info_state: infoState
            } = value;
            const {user_name: fromUserName, user_avatar: fromUserAvatar} = await this.userService.getUserBasicMes({
                user_id: fromUserId
            })
            return {
                infoId,
                fromUserId,
                fromUserName,
                fromUserAvatar,
                infoContent,
                infoContentType,
                infoCreatedTime,
                infoState
            }
        })
        const resolvedMapInfos = await Promise.all(mapInfos);
        return {
            notReadCount,
            infos: resolvedMapInfos
        }; 
    }
}