import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import * as jwt from "jwt-simple";

import { UserService } from "../typeorm/models/services/user.service";
import { jwtConfig } from "../config/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}

    /**
     * 解码Token
     * @param accessToken 
     */
    decodeToken(accessToken: string) {
        try {
            return jwt.decode(accessToken,jwtConfig.jwtSecret);
        }catch(e) {
            throw new HttpException("无效Token，此为非法登录",HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 验证Token
     * @param accessToken 
     */
    async validateToken(accessToken: string): Promise<boolean> {
        const decodedToken  = this.decodeToken(accessToken);
        console.log('decodedToken',decodedToken);
        if(decodedToken.expires < Date.now()) {
            throw new HttpException("Token已过期，请重新登录",HttpStatus.FORBIDDEN);
        }
        if(this.userService.checkUserExistence({user_id: decodedToken.usrId})) {
            return true;
        }
        else {
            throw new HttpException("无效Token，此为非法登录",HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 验证用户名和密码是否匹配
     * @param userName 
     * @param password 
     */
    async validatePassword(userName: string, password: string): Promise<boolean> {
        return this.userService.checkUserExistence({ user_name: userName }) &&
            this.userService.checkUserPassword(userName, password);
    }

    /**
     * 生成JWT
     * @param userName 
     */
    async genJWT(userName: string) {
        const userId = (await this.userService.getUserBasicMes({user_name: userName})).user_id;
        const payload = {
            userId,
            enviroment: 'web',
            expires: Date.now() + jwtConfig.tokenExpiresTime
        };
        const token = jwt.encode(payload,jwtConfig.jwtSecret);
        return token;
    }
}