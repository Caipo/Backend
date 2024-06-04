import { IsNotEmpty } from "class-validator";

export class CreateMessageInput {
	@IsNotEmpty()
	message: string;
}

export class RequestHeaders {
    csrf: string;
    userid: string;
}
