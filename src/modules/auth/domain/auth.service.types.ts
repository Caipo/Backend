import { ServiceUser } from "src/modules/user/domain/user.service.types";

export const AuthServiceName = "AuthService";

export interface AuthServiceDefinition {
	login(input: ServiceLoginInput): Promise<ServiceUser>;
}

/***** INPUTS *****/
export type ServiceLoginInput = {
	username: string;
	password: string;
};

export type ServiceCheckTokenInput = {
	token: string;
};
