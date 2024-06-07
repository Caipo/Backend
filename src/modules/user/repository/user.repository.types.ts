export const UserRepositoryName = "UserRepository";

export interface UserRepositoryDefinition {
	createUser(input: RepoCreateUserInput): Promise<RepoUser>;
	getUserByUsername(input: RepoGetUserByUsernameInput): Promise<RepoUser>;
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

/***** INPUTS *****/
export type RepoCreateUserInput = {
	username: string;
	password: string;
};

export type RepoGetUserByUsernameInput = {
	username: string;
};
