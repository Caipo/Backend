import { Controller, Inject, Headers, Get } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { MessageServiceDefinition, MessageServiceName } from "src/modules/message/domain/message.service.types";
import { ApiMessage } from "src/modules/message/api/message.types";
import { GetMessageHeaders } from "src/modules/message/api/message.queries.inputs";

@Controller(Paths.message.root)
export class MessageQueriesController {
	constructor(@Inject(MessageServiceName) private messageService: MessageServiceDefinition) {}

	@Get(Paths.message.queries.getMessages)
	async getMessages(@Headers() headers: GetMessageHeaders): Promise<ApiMessage[] | number> {
		return this.messageService.getMessages({ token: headers.csrf });
	}
}
