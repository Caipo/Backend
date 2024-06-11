import { IsNotEmpty } from "class-validator";

export class CreateMessageInput {
	@IsNotEmpty()
	message: string;

	@IsNotEmpty()
	userId: string;
}
