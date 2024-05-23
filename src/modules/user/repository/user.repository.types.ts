export const UserRepositoryName = "UserRepository";

export interface UserRepositoryDefinition {
	createUser(input: RepoCreateUserInput): Promise<RepoUser>;
	getUsers(input: RepoGetUsersInput): Promise<RepoUserList>;
}

/***** TYPES *****/
export type RepoUser = {
	id: string;
	profilePictureUrl: string;
	displayName: string;
	username: string;
	password: string;
	biography: string;
	createdAt: bigint;
};


export type RepoUserList = {
    users : RepoUser[];
};
/***** INPUTS *****/
export type RepoCreateUserInput = {
	username: string;
	password: string;
};

export type RepoGetUsersInput = {};
