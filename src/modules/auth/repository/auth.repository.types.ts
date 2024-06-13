export const AuthRepositoryName = "AuthRepository";

export interface AuthRepositoryDefinition {
	login(input: RepoLoginInput): Promise<RepoAuth>;
}

/***** TYPES *****/
export type RepoAuth = {
	userId: string;
	createdAt: bigint;
	expiredAt: bigint;
};

/***** INPUTS *****/
export type RepoLoginInput = {
	userId: string;
	createdAt: bigint;
	expiredAt: bigint;
};
