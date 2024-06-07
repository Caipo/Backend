import { ClassProvider, Inject, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ServiceLoginInput, AuthServiceDefinition, AuthServiceName } from "src/modules/auth/domain/auth.service.types";
import {
	RepoAuth,
	AuthRepositoryDefinition,
	AuthRepositoryName,
} from "src/modules/auth/repository/auth.repository.types";
import { UserServiceDefinition, UserServiceName, ServiceUser } from "src/modules/user/domain/user.service.types";
import { randomBytes } from "crypto"; // CSRF

const VALID_TOKEN_TIME: bigint = 2628n * 10000n; // Amount of seconds in a month

@Injectable()
export class AuthService implements AuthServiceDefinition {
	constructor(
		@Inject(AuthRepositoryName) private readonly authRepository: AuthRepositoryDefinition,
		@Inject(UserServiceName) private userService: UserServiceDefinition,
	) {}

	public static Provider(): ClassProvider<AuthService> {
		return {
			provide: AuthServiceName,
			useClass: AuthService,
		};
	}

	async login({ username, password }: ServiceLoginInput): Promise<ServiceUser> {
		const createdAt: bigint = BigInt(Date.now());
		const expiredAt: bigint = createdAt + VALID_TOKEN_TIME;
		const user: ServiceUser = await this.userService.getUserByUsername({ username });

		if (password != user.password) {
			throw new HttpException("Passwords Is Incorrect", HttpStatus.FORBIDDEN);
		}

		// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
		var token = randomBytes(4).toString("hex");

		const repoAuth: RepoAuth = await this.authRepository.login({
			token: token,
			userId: user.id,
			createdAt: createdAt,
			expiredAt: expiredAt,
		});

		return user;
	}
}
