export const UserServiceName = "UserService";

export interface UserServiceDefinition {
	createUser(input: ServiceCreateUserInput): Promise<ServiceUser>;
	getUserByUsername(input: ServiceGetUserByUsernameInput): Promise<ServiceUser>;
}

/***** TYPES *****/
export type ServiceUser = {
	id: string;
	profilePictureUrl: string;
	displayName: string;
	username: string;
	password: string;
	biography: string;
};

/***** INPUTS *****/
export type ServiceCreateUserInput = {
	username: string;
	password: string;
};

export type ServiceGetUserByUsernameInput = {
	username: string;
};
