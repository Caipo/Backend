import { ClassProvider, Inject, Injectable } from "@nestjs/common";
import {
	ServiceCreateMessageInput,
	ServiceGetMessageInput,
	ServiceMessage,
	MessageServiceDefinition,
	MessageServiceName,
} from "src/modules/message/domain/message.service.types";
import { AuthServiceDefinition, AuthServiceName } from "src/modules/auth/domain/auth.service.types";
import {
	RepoMessage,
	MessageRepositoryDefinition,
	MessageRepositoryName,
} from "src/modules/message/repository/message.repository.types";

@Injectable()
export class MessageService implements MessageServiceDefinition {
	constructor(
		@Inject(MessageRepositoryName) private readonly messageRepository: MessageRepositoryDefinition,
		@Inject(AuthServiceName) private authService: AuthServiceDefinition,
	) {}

	public static Provider(): ClassProvider<MessageService> {
		return {
			provide: MessageServiceName,
			useClass: MessageService,
		};
	}

	async getMessages({ token }: ServiceGetMessageInput): Promise<ServiceMessage[]> {
		const serviceAuth = await this.authService.checkToken({ token });

		const repoMessages: RepoMessage[] = await this.messageRepository.getMessages();

		return repoMessages.map((repoMessage) => ({
			id: repoMessage.id,
            senderId: serviceAuth.userId,
			message: repoMessage.message,
			createdAt: repoMessage.createdAt,
		}));
	}

	async createMessage({ message, token }: ServiceCreateMessageInput): Promise<ServiceMessage> {
		const serviceAuth = await this.authService.checkToken({ token });

		const createdAt: bigint = BigInt(Date.now());
		const repoUser: RepoMessage = await this.messageRepository.createMessage({
			message: message,
			createdAt: createdAt,
		});

		const serviceMessage: ServiceMessage = { 
			id: repoUser.id,
            senderId: serviceAuth.userId,
			message: repoUser.message,
			createdAt: repoUser.createdAt,
		};

		return serviceMessage;
	}
}
