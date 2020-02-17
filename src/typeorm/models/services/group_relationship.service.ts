import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import { UserService } from "./user.service";
import { GroupRelationship } from "../entities/group_relationship.entity";
import { _GroupService } from "./_group.service";


@Injectable()
export class GroupRelationshipService {
    constructor(
        @Inject('GROUPRELATIONSHIP_REPOSITORY')
        private readonly groupRelationshipRepository: Repository<GroupRelationship>,
        private readonly groupService: _GroupService,
        private readonly userService: UserService
    ){}

    /**
     * 添加群组关系
     * @param groupRelationshipMes 
     */
    async createGroupRelationship(groupRelationshipMes: GroupRelationship) {
        let {user_id,group_id} = groupRelationshipMes;
        if(this.userService.checkUserExistence({user_id})&&this.groupService.checkGroupExistence({group_id})) {
            await this.groupRelationshipRepository.insert(groupRelationshipMes);
        }
    }
    /**
     * 根据指定条件获取群组关系
     * @param option 
     */
    async getgroupRelationships<T extends keyof GroupRelationship>(option: Pick<GroupRelationship,T>): Promise<Array<GroupRelationship>> {
        return await this.groupRelationshipRepository.find(option);
    }
}