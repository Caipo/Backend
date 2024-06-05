import { Body, Headers, Controller, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { CreateMessageInput, CreateMessageHeaders } from "src/modules/message/api/message.mutations.inputs";
import { ApiMessage } from "src/modules/message/api/message.types";
import { MessageServiceDefinition, MessageServiceName } from "src/modules/message/domain/message.service.types";

@Controller(Paths.message.root)
@UsePipes(new ValidationPipe())
export class MessageMutationsController {
	constructor(@Inject(MessageServiceName) private messageService: MessageServiceDefinition) {}

	@Post(Paths.message.mutations.createMessage)
	async createMessage(
		@Body() input: CreateMessageInput,
		@Headers() header: CreateMessageHeaders,
	): Promise<ApiMessage | number> {
		const serviceMessage = await this.messageService.createMessage({
			message: input.message,
			token: header.csrf,
		});

		const apiMessage: ApiMessage = {
			id: serviceMessage.id,
            senderId: serviceMessage.senderId,
			message: serviceMessage.message,
		};

		return apiMessage;
	}
}
