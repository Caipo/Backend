export const AuthServiceName = "AuthService";

export interface AuthServiceDefinition {
	login(input: ServiceLoginInput): Promise<ServiceAuth>;
	checkToken(input: ServiceCheckTokenInput): Promise<ServiceAuth>;
}

/***** TYPES *****/
export type ServiceAuth = {
	status: number;
	token: string;
	userId: string;
	createdAt: bigint;
	expiredAt: bigint;
};

/***** INPUTS *****/
export type ServiceLoginInput = {
	username: string;
	password: string;
};

export type ServiceCheckTokenInput = {
	token: string;
};
