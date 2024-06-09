import { ClassProvider, Inject, Injectable, HttpException, HttpStatus  } from "@nestjs/common";
import {
	ServiceCreateUserInput,
	ServiceUser,
	UserServiceDefinition,
	UserServiceName,
} from "src/modules/user/domain/user.service.types";
import { profilePictures } from "src/modules/user/domain/pictures";
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

	async createUser({ username, password }: ServiceCreateUserInput): Promise<ServiceUser> {
		const createdAt: bigint = BigInt(Date.now());
		const defaultBiography: string = "Defualt Bio";

		const randomIndex: number = Math.floor(Math.random() * profilePictures.length);
		const profilePictureUrl: string = profilePictures[randomIndex];
        
        if(await this.userRepository.checkUsernameTaken({username: username})){
            throw new HttpException("Username Taken", HttpStatus.CONFLICT);
        }

		const repoUser: RepoUser = await this.userRepository.createUser({
			username: username,
			password: password,
			createdAt: createdAt,
			biography: defaultBiography,
			profilePictureUrl: profilePictureUrl,
		});

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
