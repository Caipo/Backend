export const AuthRepositoryName = "AuthRepository";

export interface AuthRepositoryDefinition {
	login(input: RepoLoginInput): Promise<RepoAuth>;
	getCsrf(input: ReopGetCsrfInput): Promise<RepoAuth>;
}

/***** TYPES *****/
export type RepoAuth = {
	status: number;
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
export type ReopGetCsrfInput = {
	token: string;
};
