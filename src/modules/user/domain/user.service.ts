import { registerUser } from "src/modules/user/repository/user.repository";
import CryptoJS = require("crypto-js");

class User {
	userName: string;
	password: string;
}

export function createUser(userName: string, password: string): User {
	const hash = CryptoJS.SHA256(password).toString();

	const user: User = {
		userName: userName,
		password: hash,
	};

	return registerUser(user);
}
