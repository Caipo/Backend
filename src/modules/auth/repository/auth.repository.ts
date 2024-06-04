import { ClassProvider, Injectable } from "@nestjs/common";
import {
	RepoLoginInput,
	ReopGetCsrfInput,
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
    async getCsrf({token} : ReopGetCsrfInput): Promise< RepoAuth | number>{
        const userSessionRecord = await this.dataSource.getRepository(UserSessionRecord).findOne({ where: { token: token } });

        if(!userSessionRecord){
            return 404;
        }

        console.log(userSessionRecord.user)

		const repoAuth: RepoAuth = {
			token: userSessionRecord.token,
			userId: '51841757-4f59-4f7b-84f1-7a12d47121c7',
            status: 201,
			createdAt: userSessionRecord.createdAt,
			expiredAt: userSessionRecord.expiredAt,
		};
        return repoAuth;

    };
}
