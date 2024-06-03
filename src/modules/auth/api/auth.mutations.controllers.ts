import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { LoginInput } from "src/modules/auth/api/auth.mutations.inputs";
import { ApiAuth } from "src/modules/auth/api/auth.types";
import { AuthServiceDefinition, AuthServiceName } from "src/modules/auth/domain/auth.service.types";

@Controller(Paths.auth.root)
@UsePipes(new ValidationPipe())
export class AuthMutationsController {
	constructor(@Inject(AuthServiceName) private authService: AuthServiceDefinition) {}

	@Post(Paths.auth.mutations.login)
	async login(@Body() input: LoginInput): Promise<ApiAuth | number> {
		const serviceUser = await this.authService.login({
			username: input.username,
			password: input.password,
		});

        if(typeof(serviceUser) === "number"){
            return serviceUser;
        }

		const apiUser: ApiAuth = {
            status : serviceUser.status,
            token : serviceUser.token,
            userId : serviceUser.userId,
            createdAt: serviceUser.createdAt.toString(),
            expiredAt: serviceUser.expiredAt.toString(),
		};
		return apiUser;
	}
}
