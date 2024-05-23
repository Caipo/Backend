export const UserServiceName = "UserService";

export interface UserServiceDefinition {
	createUser(input: ServiceCreateUserInput): Promise<ServiceUser>;
	getUsers(input: ServiceGetUsersInput): Promise<ServiceUserList>;
}

/***** TYPES *****/
export type ServiceUser = {
	id: string;
	profilePictureUrl: string;
	displayName: string;
	username: string;
	biography: string;
};

export type ServiceUserList = {
    users : ServiceUser[]
};

/***** INPUTS *****/
export type ServiceCreateUserInput = {
	username: string;
	password: string;
};

export type ServiceGetUsersInput = {
};
