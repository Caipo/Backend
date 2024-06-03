export const Paths = {
	root: "/",
	auth: {
		root: "auth",
		mutations: {
			login: "login",
		},
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
			createUser: "create-user",
		},
	},
};
