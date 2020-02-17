import { Controller, Post, Body } from "@nestjs/common";

import { LoginService } from "./login.service";


@Controller()
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) {}

    @Post('login')
    async login(
        @Body('userName') userName: string,
        @Body('password') password: string,
        @Body('accessToken') accessToken: string
    ) {
        return await this.loginService.login(userName,password,accessToken);
    }

    @Post('logout')
    async loginOut(
        @Body('userId') userId: string
    ) {
        return await this.loginService.logout(userId);
    } 
}