import { Injectable } from "@nestjs/common";
import { PreferSettingService } from "../typeorm/models/services/prefer_setting.service";
import { _UserService } from "../user/user.service";

@Injectable()
export class UserSettingService {
    constructor(
        protected readonly preferSettingService: PreferSettingService,
        protected readonly userService: _UserService
    ) {}
}

