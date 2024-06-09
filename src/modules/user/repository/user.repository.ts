import { ClassProvider, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import {
	CreateUserInput,
	RepoUser,
	UserRepositoryDefinition,
    CheckUsernameTakenInput,
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
	async createUser({
		username,
		password,
		createdAt,
		profilePictureUrl,
		biography,
	    }: CreateUserInput): Promise<RepoUser> {

		const userToSave = {
			profilePictureUrl: profilePictureUrl,
			displayName: username,
			username: username,
			password: password,
			biography: biography,
			createdAt: createdAt,
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

	async checkUsernameTaken({ username }: CheckUsernameTakenInput): Promise<boolean> {
		const userRecord = await this.dataSource.getRepository(UserRecord).findOne({ where: { username: username } });

		if (!userRecord) {
            return false;
		}
        return true;
	}


}
