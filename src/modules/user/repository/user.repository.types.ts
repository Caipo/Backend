export const UserRepositoryName = "UserRepository";

export interface UserRepositoryDefinition {
	createUser(input: RepoCreateUserInput): Promise<RepoUser>;
	getUsers(): Promise<RepoUser[]>;
	getUserByUsername(input: RepoGetUserByUsernameInput): Promise<RepoUser>;
}

/***** TYPES *****/
export type RepoUser = {
	id: string;
	profilePictureUrl: string;
	displayName: string;
	username: string;
	hash: string;
	biography: string;
	createdAt: bigint;
};

/***** INPUTS *****/
export type RepoCreateUserInput = {
	username: string;
	hash: string;
	biography: string;
	profilePictureUrl: string;
	createdAt: bigint;
};

export type RepoGetUserByUsernameInput = {
	username: string;
};
