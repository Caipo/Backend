import { IsNotEmpty } from "class-validator";

export class CreateTribeInput {
	@IsNotEmpty()
	tribe: string;
}

export class CreateTribeHeaders {
	csrf: string;
	userid: string;
}
