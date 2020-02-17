import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Friendship } from "../entities/friendship.entity";

@Injectable()
export class FriendshipService {
    constructor(
        @Inject("FRIENDSHIP_REPOSITORY")
        private readonly friendshipRepository: Repository<Friendship>
    ) {}

    /**
     * 查询好友关系是否存在
     * @param option 
     */
    async checkFriendshipExistence<T>(option: T): Promise<boolean> {
        const count = await this.friendshipRepository.count(option);
        return count === 0 ? false : true;
    }

    /**
     * 通过option查询指定的好友关系信息
     * @param option 
     */
    async getFriendshipMes<T>(option: T): Promise<Friendship[]> {
        return await this.friendshipRepository.find(option);
    }

    /**
     * 新建好友关系
     * @param friendshipMes 
     */
    async createFriendship<T>(friendshipMes: T) {
        await this.friendshipRepository.insert(friendshipMes);
    }

    /**
     * 修改好友关系
     * @param option 
     * @param updateContent 
     */
    async updateFriendship<T,N>(option: T,updateContent: N) {
        await this.friendshipRepository.update(option,updateContent);
    }
}