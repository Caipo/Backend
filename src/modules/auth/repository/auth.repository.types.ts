export const AuthRepositoryName = "AuthRepository";

export interface AuthRepositoryDefinition {
	login(input: RepoLoginInput): Promise<RepoAuth>;
}

/***** TYPES *****/
export type RepoAuth = {
	token: string;
	userId: string;
	createdAt: bigint;
	expiredAt: bigint;
};

/***** INPUTS *****/
export type RepoLoginInput = {
	token: string;
	userId: string;
	createdAt: bigint;
	expiredAt: bigint;
};

/***** INPUTS *****/
export type ReopGetUserSessionInput = {
	token: string;
};
