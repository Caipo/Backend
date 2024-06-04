import { Body, Headers, Controller, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { CreateMessageInput, RequestHeaders } from "src/modules/message/api/message.mutations.inputs";
import { ApiMessage } from "src/modules/message/api/message.types";
import { MessageServiceDefinition, MessageServiceName } from "src/modules/message/domain/message.service.types";

@Controller(Paths.message.root)
@UsePipes(new ValidationPipe())
export class MessageMutationsController {
	constructor(@Inject(MessageServiceName) private messageService: MessageServiceDefinition) {}

	@Post(Paths.message.mutations.createMessage)
    async createMessage(@Body() input: CreateMessageInput, @Headers() header : RequestHeaders ): Promise<ApiMessage | number> {

        console.log("id " + header.userid)
		const serviceMessage = await this.messageService.createMessage({
			message: input.message,
            token: header.csrf,
            userId: header.userid,
		});
        
        if(typeof(serviceMessage) == 'number'){
            return serviceMessage;
        }

		const apiMessage: ApiMessage = {
			id: serviceMessage.id,
			message: serviceMessage.message,
		};

		return apiMessage;
	}
}
