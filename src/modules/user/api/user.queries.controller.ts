import {Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import {GetUserInput} from "src/modules/user/api/user.queries.inputs";
import {UserServiceDefinition, UserServiceName} from "src/modules/user/domain/user.service.types";
import {ApiUser} from "src/modules/user/api/user.types";
  
@Controller(Paths.user.root)
export class UserQueriesController {
	constructor(@Inject(UserServiceName) private userService: UserServiceDefinition) {}

	@Get(Paths.user.queries.getUsers)
	async getUser(@Body() input: GetUserInput){
        const serviceUserList = await this.userService.getUsers({});
		return serviceUserList;
}
}
