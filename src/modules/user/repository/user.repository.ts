import {ClassProvider, Injectable} from "@nestjs/common";
import {
    RepoCreateUserInput,
    RepoUser,
    UserRepositoryDefinition,
    UserRepositoryName
} from "src/modules/user/repository/user.repository.types";
import {DataSource} from "typeorm";

@Injectable()
export class UserRepository implements UserRepositoryDefinition {
    constructor(private dataSource: DataSource) {}

    public static Provider(): ClassProvider<UserRepository> {
        return {
            provide: UserRepositoryName,
            useClass: UserRepository,
        }
    }

    async createUser({username, password}: RepoCreateUserInput): Promise<RepoUser> {
        const mockUser: RepoUser = {
            id: "123",
            profilePictureUrl: "url",
            displayName: "displayName",
            username: username,
            password: password,
            biography: "biography",
            createdAt: "createdAt",
        }

        return Promise.resolve(mockUser);
    }
}