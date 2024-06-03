import { ClassProvider, Injectable } from "@nestjs/common";
import {
	RepoLoginInput,
	RepoAuth,
	AuthRepositoryDefinition,
	AuthRepositoryName,
} from "src/modules/auth/repository/auth.repository.types";
import { DataSource } from "typeorm";
import { UserSessionRecord } from "src/core/infrastructure/entities/Auth";

@Injectable()
export class AuthRepository implements AuthRepositoryDefinition {
	constructor(private dataSource: DataSource) {}

	public static Provider(): ClassProvider<AuthRepository> {
		return {
			provide: AuthRepositoryName,
			useClass: AuthRepository,
		};
	}

    async login({token, userId, createdAt, expiredAt} : RepoLoginInput): Promise<RepoAuth> {
		const authToSave = {
			token: token,
			userId: userId,
			createdAt: createdAt,
			expiredAt: expiredAt,
		};

		const savedUserRecord = await this.dataSource.getRepository(UserSessionRecord).save(authToSave);

		const repoAuth: RepoAuth = {
			token: savedUserRecord.token,
			userId: savedUserRecord.userId,
            status: 201,
			createdAt: savedUserRecord.createdAt,
			expiredAt: savedUserRecord.expiredAt,
		};

		return repoAuth;
	}
}
