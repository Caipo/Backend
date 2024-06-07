import { ClassProvider, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import {
	RepoCreateUserInput,
	RepoGetUserByUsernameInput,
	RepoUser,
	UserRepositoryDefinition,
	UserRepositoryName,
} from "src/modules/user/repository/user.repository.types";
import { DataSource } from "typeorm";
import { UserRecord } from "src/core/infrastructure/entities/User";

@Injectable()
export class UserRepository implements UserRepositoryDefinition {
	constructor(private dataSource: DataSource) {}

	public static Provider(): ClassProvider<UserRepository> {
		return {
			provide: UserRepositoryName,
			useClass: UserRepository,
		};
	}

	async getUserByUsername({ username }: RepoGetUserByUsernameInput): Promise<RepoUser> {
		const userRecord = await this.dataSource.getRepository(UserRecord).findOne({ where: { username: username } });

		if (!userRecord) {
			throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
		}

		const repoUsers: RepoUser = {
			id: userRecord.id,
			profilePictureUrl: userRecord.profilePictureUrl,
			displayName: userRecord.displayName,
			username: userRecord.username,
			password: userRecord.password,
			biography: userRecord.biography,
			createdAt: userRecord.createdAt,
		};
		return repoUsers;
	}

	async createUser({ username, password }: RepoCreateUserInput): Promise<RepoUser> {
		const userToSave = {
			profilePictureUrl: "url",
			displayName: "displayName",
			username: username,
			password: password,
			biography: "biography",
			createdAt: BigInt(15),
		};

		const savedUserRecord = await this.dataSource.getRepository(UserRecord).save(userToSave);

		const repoUser: RepoUser = {
			id: savedUserRecord.id,
			profilePictureUrl: savedUserRecord.profilePictureUrl,
			displayName: savedUserRecord.displayName,
			username: savedUserRecord.username,
			password: savedUserRecord.password,
			biography: savedUserRecord.biography,
			createdAt: savedUserRecord.createdAt,
		};

		return repoUser;
	}
}
