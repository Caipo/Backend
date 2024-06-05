import { ClassProvider, Inject, Injectable } from "@nestjs/common";
import {
	ServiceCreateUserInput,
	ServiceGetUserByUsernameInput,
	ServiceUser,
	UserServiceDefinition,
	UserServiceName,
} from "src/modules/user/domain/user.service.types";
import {
	RepoUser,
	UserRepositoryDefinition,
	UserRepositoryName,
} from "src/modules/user/repository/user.repository.types";
import { profilePictures } from "src/modules/user/domain/pictures";
import { SALT } from "src/modules/auth/domain/auth.service";
import CryptoJS = require("crypto-js");

@Injectable()
export class UserService implements UserServiceDefinition {
	constructor(@Inject(UserRepositoryName) private readonly userRepository: UserRepositoryDefinition) {}

	public static Provider(): ClassProvider<UserService> {
		return {
			provide: UserServiceName,
			useClass: UserService,
		};
	}

	async getUserByUsername({ username }: ServiceGetUserByUsernameInput): Promise<ServiceUser> {
		const repoUser = await this.userRepository.getUserByUsername({ username: username });

		const serviceUsers: ServiceUser = {
			id: repoUser.id,
			profilePictureUrl: repoUser.profilePictureUrl,
			displayName: repoUser.displayName,
			username: repoUser.username,
			hash: repoUser.hash,
			biography: repoUser.biography,
		};

		return serviceUsers;
	}

	async getUsers(): Promise<ServiceUser[]> {
		const repoUsers = await this.userRepository.getUsers();

		const serviceUsers: ServiceUser[] = repoUsers.map((repoUser) => ({
			id: repoUser.id,
			profilePictureUrl: repoUser.profilePictureUrl,
			displayName: repoUser.displayName,
			username: repoUser.username,
			hash: repoUser.hash,
			biography: repoUser.biography,
		}));

		return serviceUsers;
	}

	async createUser({ username, password }: ServiceCreateUserInput): Promise<ServiceUser> {
		const hash: string = CryptoJS.SHA256(password + SALT).toString();
		const createdAt: bigint = BigInt(Date.now());
		const defaultBiography: string = "Defualt Bio";
		const randomIndex: number = Math.floor(Math.random() * profilePictures.length);
		const profilePictureUrl: string = profilePictures[randomIndex];

		const repoUser: RepoUser = await this.userRepository.createUser({
			username: username,
			hash: hash,
			createdAt: createdAt,
			biography: defaultBiography,
			profilePictureUrl: profilePictureUrl,
		});

		const serviceUser: ServiceUser = {
			id: repoUser.id,
			profilePictureUrl: repoUser.profilePictureUrl,
			displayName: repoUser.displayName,
			username: repoUser.username,
			hash: repoUser.hash,
			biography: repoUser.biography,
		};

		return serviceUser;
	}
}
