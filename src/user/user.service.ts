import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../typeorm/models/services/user.service";
import { User } from "src/typeorm/models/entities/user.entity";

@Injectable()
export class _UserService {
    constructor(
        private readonly userService: UserService
    ) {}
    /**
     * 获取用户信息
     * @param option 
     */
    async getUserMes<T extends keyof User>(option: Pick<User,T>) {
        this.checkUser(option);
        return this.userService.getUserBasicMes(option);
    }
    /**
     * 检查用户是否存在
     * @param userMes 
     */
    async checkUser<T extends keyof User>(userMes: Pick<User,T>) {
        const existence: boolean = await this.userService.checkUserExistence(userMes);
        if(!existence) {
            throw new HttpException('该用户不存在，为非法登录',HttpStatus.FORBIDDEN);
        }
    }
}