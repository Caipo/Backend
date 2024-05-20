import {IsNotEmpty} from "class-validator";

export class CreateUserInput {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}