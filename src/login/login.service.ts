import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import * as bcrypt from "bcryptjs";

import { AuthService } from "../auth/auth.service";
import { UserService } from "../typeorm/models/services/user.service";
import { SocketService } from "../typeorm/models/services/socket.service";
import { PreferSettingService } from "../typeorm/models/services/prefer_setting.service";

@Injectable()
export class LoginService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly socketService: SocketService,
        private readonly preferSettingService: PreferSettingService
    ) {}
    /**
     * 通过账密/jwt进行登录
     * @param userName 
     * @param password 
     * @param accessToken 
     */
    async login(userName: string, password: string, accessToken: string): Promise<any> {
        const datetime: string = new Date().toLocaleString();

        if (accessToken) {
            if(await this.authService.validateToken(accessToken)) {
                const {userId} = this.authService.decodeToken(accessToken);
                const userBasicMes = await this.userService.getUserBasicMes({user_id: userId});
                const {user_id,user_socketId,user_preferSetting_id} = userBasicMes;
                await this.userService.updateUser({
                    user_id
                },{
                    user_lastLogin_time: datetime,
                    user_state: 1,
                    user_socketId,
                    user_preferSetting_id
                })
                return {
                    error_code: 0,
                    data: {
                        message: "登录成功",
                        userBasicMes
                    }
                }
            }
        }
        else if(userName && password){
            if(await this.authService.validatePassword(userName, password)) {
                const token: string = await this.authService.genJWT(userName);
                let userBasicMes = await this.userService.getUserBasicMes({user_name: userName});
                let {user_id,user_socketId, user_preferSetting_id} = userBasicMes;
                if(!user_socketId) {
                     user_socketId = await this.socketService.createSocket({});
                }
                if(!user_preferSetting_id) {
                    user_preferSetting_id = await this.preferSettingService.createDefaultPreferSetting();
                }
                await this.userService.updateUser({
                    user_id
                },{
                    user_lastLogin_time: datetime,
                    user_state: 1,
                    user_socketId,
                    user_preferSetting_id
                })
                userBasicMes = await this.userService.getUserBasicMes({user_name: userName});
                return {
                    error_code: 0,
                    data: {
                        message: '登录成功',
                        accessToken: token,
                        userBasicMes
                    }
                }
            }
            else {
                throw new HttpException("用户名或密码不正确",HttpStatus.FORBIDDEN);
            }
        }
        else {
            throw new HttpException("非法登录",HttpStatus.FORBIDDEN);
        }
    }
    /**
     * 用户登出
     * @param userId 
     */
    async logout(userId: string): Promise<any> {
        this.userService.updateUser({
            user_id: userId
        },{
            user_state: 0
        })
        return {
            error_code: 0,
            data: {
                message: "退出登录成功"
            }
        }
    }

}

