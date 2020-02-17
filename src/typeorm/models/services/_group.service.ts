import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Group } from "../entities/_group.entity";

type GroupKeys = keyof Group;

@Injectable()
export class _GroupService {
    constructor(
        @Inject('GROUP_REPOSITORY') 
        private readonly groupRepository: Repository<Group>
    ) {}

    /**
     * 检查群组是否已存在
     * @param checkOption 
     */
    async checkGroupExistence<T extends GroupKeys>(checkOption: Pick<Group,T>): Promise<boolean> {
        const count = await this.groupRepository.count(checkOption);
        return count === 0 ? false : true;
    }

    /**
     * 得到默认分组信息，如果没有找到则返回拒绝原因
     */
    async getDefaultGroup(): Promise<Group> {
        return await this.groupRepository.findOneOrFail({
            group_type: 0
        })
    }

    /**
     * 创建群组并返回群组基本信息
     * @param groupMes 
     */
    async createGroup(groupMes: Group): Promise<Group> {
        const groupId = (await this.groupRepository.insert(groupMes)).identifiers[0].group_id;
        return await this.getGroupMes({
            group_id: groupId
        })
    }

    /**
     * 根据指定条件获取群组信息
     * @param option 
     */
    async getGroupMes<T extends GroupKeys>(option: Pick<Group,T>): Promise<Group> {
        return await this.groupRepository.findOneOrFail(option);
    }
}