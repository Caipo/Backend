import { Controller, Get, Inject } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { MessageServiceDefinition, MessageServiceName } from "src/modules/message/domain/message.service.types";
import { ApiMessage } from "src/modules/message/api/message.types";

@Controller(Paths.message.root)
export class MessageQueriesController {
	constructor(@Inject(MessageServiceName) private messageService: MessageServiceDefinition) {}

	@Get(Paths.message.queries.getMessages)
	async getMessages(): Promise<ApiMessage[]> {
		return this.messageService.getMessages();
	}
}
