export const AuthServiceName = "AuthService";

export interface AuthServiceDefinition {
	login(input: ServiceLoginInput): Promise<ServiceAuth | number>;
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
