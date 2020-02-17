import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";


import { RandomAvatars } from "../entities/random_avatars.entity";

@Injectable()
export class RandomAvatarsService {
    constructor(
        @Inject('RANDOMAVATARS_REPOSITORY') 
        private readonly randomAvatarsRepository: Repository<RandomAvatars>
    ) {}

    /**
     * 获取一张随机图片链接地址
     */
    async getRandomAvatarUrl(): Promise<string> {
        const count = await this.randomAvatarsRepository.count();
        const randomNum =Math.floor(Math.random() * count + 1);
        const avatarMes: RandomAvatars = (await this.randomAvatarsRepository.find({
            skip: randomNum-1,
            take: 1
        }))[0]
        return avatarMes.random_avatar_url;
    }
}
