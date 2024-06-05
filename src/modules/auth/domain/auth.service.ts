import { ClassProvider, Inject, Injectable, HttpException,  HttpStatus} from "@nestjs/common";
import {
	ServiceLoginInput,
	ServiceCheckTokenInput,
	ServiceAuth,
	AuthServiceDefinition,
	AuthServiceName,
} from "src/modules/auth/domain/auth.service.types";
import { UserServiceDefinition, UserServiceName, ServiceUser } from "src/modules/user/domain/user.service.types";
import {
	RepoAuth,
	AuthRepositoryDefinition,
	AuthRepositoryName,
} from "src/modules/auth/repository/auth.repository.types";
import CryptoJS = require("crypto-js"); // hash
import crypto = require("crypto"); // token

const VALID_TOKEN_TIME = 2628n * 10000n; // Amount of seconds in a mounth
export const SALT = "3b7f9e2c1d4a5e6b7c8f0a1d9e3b2c4d";

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

	async login({ username, password }: ServiceLoginInput): Promise<ServiceAuth> {
		const createdAt: bigint = BigInt(Date.now());
		const user: ServiceUser | number = await this.userService.getUserByUsername({ username });
		const loginHash: string = CryptoJS.SHA256(password + SALT).toString();
		const expiredAt: bigint = createdAt + VALID_TOKEN_TIME;

		// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
		var token = crypto.randomBytes(4).toString("hex");

		if (loginHash != user.hash) {
            throw new HttpException('Passwords Dont Match', HttpStatus.FORBIDDEN);
		}

		const repoAuth: RepoAuth = await this.authRepository.login({
			token: token,
			createdAt: createdAt,
			expiredAt: expiredAt,
			userId: user.id,
		});

		return {
			token: repoAuth.token,
			status: 201,
			createdAt: repoAuth.createdAt,
			expiredAt: repoAuth.expiredAt,
			userId: repoAuth.userId,
		};
	}

	async checkToken({ token }: ServiceCheckTokenInput): Promise<ServiceAuth> {
        const repoAuth  = await this.authRepository.getCsrf({ token });

		if (repoAuth.expiredAt < BigInt(Date.now())) {
            throw new HttpException('Tokens Expired', HttpStatus.FORBIDDEN);
		}
        
        return {
            status: repoAuth.status,
            token: repoAuth.token,
            userId: repoAuth.userId,
            createdAt: repoAuth.createdAt,
            expiredAt: repoAuth.expiredAt,
        };
	}
}
