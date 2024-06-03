import { ClassProvider, Injectable } from "@nestjs/common";
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

    async getUserByUsername({username} : RepoGetUserByUsernameInput ): Promise<RepoUser | number> {
        const userRecord = await this.dataSource.getRepository(UserRecord).findOne({ where: { username: username } });
        
        if (!userRecord){
            return 404;
        }

		const repoUsers: RepoUser = {
			id: userRecord.id,
			profilePictureUrl: userRecord.profilePictureUrl,
			displayName: userRecord.displayName,
			username: userRecord.username,
			hash: userRecord.password,
			biography: userRecord.biography,
			createdAt: userRecord.createdAt,
		};
		return repoUsers;
	}


	async getUsers(): Promise<RepoUser[]> {
		const userRecords = await this.dataSource.getRepository(UserRecord).find();

		const repoUsers: RepoUser[] = userRecords.map((userRecord) => ({
			id: userRecord.id,
			profilePictureUrl: userRecord.profilePictureUrl,
			displayName: userRecord.displayName,
			username: userRecord.username,
			hash: userRecord.password,
			biography: userRecord.biography,
			createdAt: userRecord.createdAt,
		}));
		return repoUsers;
	}

	async createUser({
		username,
		hash,
		createdAt,
		profilePictureUrl,
		biography,
	}: RepoCreateUserInput): Promise<RepoUser> {
		const userToSave = {
			profilePictureUrl: profilePictureUrl,
			displayName: username,
			username: username,
			password: hash,
			biography: biography,
			createdAt: createdAt,
		};

		const savedUserRecord = await this.dataSource.getRepository(UserRecord).save(userToSave);
		const repoUser: RepoUser = {
			id: savedUserRecord.id,
			profilePictureUrl: savedUserRecord.profilePictureUrl,
			displayName: savedUserRecord.displayName,
			username: savedUserRecord.username,
			hash: savedUserRecord.password,
			biography: savedUserRecord.biography,
			createdAt: savedUserRecord.createdAt,
		};

		return repoUser;
	}
}
