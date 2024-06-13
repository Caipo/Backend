import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { LoginInput } from "src/modules/auth/api/auth.mutations.inputs";
import { AuthServiceDefinition, AuthServiceName } from "src/modules/auth/domain/auth.service.types";
import { ApiUser } from "src/modules/user/api/user.types";

@Controller(Paths.auth.root)
@UsePipes(new ValidationPipe())
export class AuthMutationsController {
	constructor(@Inject(AuthServiceName) private authService: AuthServiceDefinition) {}

	@Post(Paths.auth.mutations.login)
	async login(@Body() input: LoginInput): Promise<ApiUser> {
		const serviceUser = await this.authService.login({
			username: input.username,
			password: input.password,
		});

		const apiUser: ApiUser = {
			id: serviceUser.id,
			profilePictureUrl: serviceUser.profilePictureUrl,
			displayName: serviceUser.displayName,
			username: serviceUser.username,
			biography: serviceUser.biography,
		};
		return apiUser;
	}
}
