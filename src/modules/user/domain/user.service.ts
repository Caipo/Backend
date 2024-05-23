import { ClassProvider, Inject, Injectable } from "@nestjs/common";
import {
	ServiceCreateUserInput,
	ServiceGetUsersInput,
	ServiceUser,
    ServiceUserList,
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
    async getUsers({}: ServiceGetUsersInput):  Promise<ServiceUserList>{
        console.log('get user Service')
        const data = await this.userRepository.getUsers({});
        return data;
    }

	async createUser({ username, password }: ServiceCreateUserInput): Promise<ServiceUser> {
		const repoUser: RepoUser = await this.userRepository.createUser({ username: username, password: password });

		const serviceUser: ServiceUser = {
			id: repoUser.id,
			profilePictureUrl: repoUser.profilePictureUrl,
			displayName: repoUser.displayName,
			username: repoUser.username,
			biography: repoUser.biography,
		};

		return serviceUser;
	}
}
