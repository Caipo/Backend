export const AuthServiceName = "AuthService";

export interface AuthServiceDefinition {
	login(input: ServiceLoginInput): Promise<ServiceAuth | number>;
    checkToken(input : ServiceCheckTokenInput): Promise<number>;
}

/***** TYPES *****/
export type ServiceAuth = {
    status : number;
    token : string;
    userId : string;
    createdAt: bigint;
    expiredAt: bigint;
};

/***** INPUTS *****/
export type ServiceLoginInput = {
	username: string;
    password: string;
};

export type ServiceCheckTokenInput = {
	userId: string;
    token: string;
}
