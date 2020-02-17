import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Info } from "../entities/info.entity";


@Injectable()
export class InfoService {
    constructor(
        @Inject("INFO_REPOSITORY")
        private readonly infoRepository: Repository<Info>
    ) {}

    /**
     * 新增通知
     * @param infoContent 
     */
    async createInfo(infoContent: Info) {
        await this.infoRepository.insert(infoContent);
    }

    /**
     * 通过指定条件查询通知
     * @param option 
     */
    async getInfosByOption<T>(option: T): Promise<Array<Info>> {
        return await this.infoRepository.find(option);
    }
}