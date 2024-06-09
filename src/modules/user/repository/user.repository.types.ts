export const UserRepositoryName = "UserRepository";

export interface UserRepositoryDefinition {
    checkUsernameTaken(input: CheckUsernameTakenInput) : Promise<boolean>;
	createUser(input: CreateUserInput): Promise<RepoUser>;
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
export type CreateUserInput = {
	username: string;
	password: string;
	biography: string;
	profilePictureUrl: string;
	createdAt: bigint;
};

export type CheckUsernameTakenInput = {
	username: string;
};

