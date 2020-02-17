import { Controller, Post, Body } from "@nestjs/common";

import {RegisterService} from "./register.service";




@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    async register(@Body('userName') userName: string, @Body('password') password: string ) {
        return await this.registerService.register(userName,password);
    }
}