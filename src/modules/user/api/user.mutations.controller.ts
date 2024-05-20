import {Body, Controller, Inject, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import {CreateUserInput} from "src/modules/user/api/user.mutations.inputs";
import {ApiUser} from "src/modules/user/api/user.types";
import {UserServiceDefinition, UserServiceName} from "src/modules/user/domain/user.service.types";

@Controller(Paths.user.root)
@UsePipes(new ValidationPipe())
export class UserMutationsController {
	constructor(@Inject(UserServiceName) private userService: UserServiceDefinition) {}

	@Post(Paths.user.mutations.createUser)
	async createUser(@Body() input: CreateUserInput): Promise<ApiUser> {
		const serviceUser = await this.userService.createUser({
			username: input.username,
			password: input.password,
		});

		const apiUser: ApiUser = {
			id: serviceUser.id,
			profilePictureUrl: serviceUser.profilePictureUrl,
			displayName: serviceUser.displayName,
			username: serviceUser.username,
			biography: serviceUser.biography,
		}

		return apiUser;
	}
}
