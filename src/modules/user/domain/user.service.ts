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
			password: repoUser.password,
			biography: repoUser.biography,
		};

		return serviceUsers;
	}

	async createUser({ username, password }: ServiceCreateUserInput): Promise<ServiceUser> {
		const repoUser: RepoUser = await this.userRepository.createUser({ username: username, password: password });

		const serviceUser: ServiceUser = {
			id: repoUser.id,
			profilePictureUrl: repoUser.profilePictureUrl,
			displayName: repoUser.displayName,
			password: repoUser.password,
			username: repoUser.username,
			biography: repoUser.biography,
		};

		return serviceUser;
	}
}
