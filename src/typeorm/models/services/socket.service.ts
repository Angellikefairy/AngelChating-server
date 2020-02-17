import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Socket } from "../entities/socket.entity";

@Injectable()
export class SocketService {
    constructor(
        @Inject("SOCKET_REPOSITORY") 
        private readonly socketRepository: Repository<Socket>
    ) {}

    /**
     * 为用户创建相关socket并返回id
     * @param socketContent 
     */
    async createSocket<T>(socketContent: T): Promise<number> {
        let v = await this.socketRepository.insert(socketContent);
        return v.identifiers[0]._id;
    }

    /**
     * 更新socket信息
     * @param option 
     * @param socketContent 
     */
    async updateSocket<T,N>(option: T,socketContent: N) {
        await this.socketRepository.update(option,socketContent);
    }

    /**
     * 检查socket是否已经存在
     * @param checkOption 
     */
    async checkSocketExistence<T>(checkOption: T): Promise<boolean> {
        const count = await this.socketRepository.count(checkOption);
        return count === 0 ? false : true;
    }

    /**
     * 获取socket信息
     * @param option 
     */
    async getSocketMes<T>(option: T): Promise<Socket> {
        return await this.socketRepository.findOne(option);
    }
}