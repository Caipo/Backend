export const Paths = {
	root: "/",
	auth: {
		root: "auth",
	},
	message: {
		root: "message",
		queries: {
			getMessages: "messages",
		},
		mutations: {
			createMessage: "create-message",
		},
	},
	user: {
		root: "user",
		queries: {
			getUsers: "users",
		},
		mutations: {
			login: "login",
			createUser: "create-user",
		},
	},
};
