import { ClassProvider, Inject, Injectable } from "@nestjs/common";
import {
	ServiceCreateMessageInput,
	ServiceMessage,
	MessageServiceDefinition,
	MessageServiceName,
} from "src/modules/message/domain/message.service.types";
import {
	RepoMessage,
	MessageRepositoryDefinition,
	MessageRepositoryName,
} from "src/modules/message/repository/message.repository.types";

@Injectable()
export class MessageService implements MessageServiceDefinition {
	constructor(@Inject(MessageRepositoryName) private readonly messageRepository: MessageRepositoryDefinition) {}

	public static Provider(): ClassProvider<MessageService> {
		return {
			provide: MessageServiceName,
			useClass: MessageService,
		};
	}

	async getMessages(): Promise<ServiceMessage[]> {
		const repoMessages: RepoMessage[] = await this.messageRepository.getMessages();

		return repoMessages.map((repoMessage) => ({
			id: repoMessage.id,
			message: repoMessage.message,
			createdAt: repoMessage.createdAt,
		}));
	}

	async createMessage({ message }: ServiceCreateMessageInput): Promise<ServiceMessage> {
		const createdAt: bigint = BigInt(Date.now());
		const repoUser: RepoMessage = await this.messageRepository.createMessage({
			message: message,
			createdAt: createdAt,
		});

		const serviceMessage: ServiceMessage = {
			id: repoUser.id,
			message: repoUser.message,
			createdAt: repoUser.createdAt,
		};

		return serviceMessage;
	}
}
