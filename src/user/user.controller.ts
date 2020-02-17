import { Controller } from "@nestjs/common";
import { _UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(
        private readonly _userService: _UserService
    ) {}
}