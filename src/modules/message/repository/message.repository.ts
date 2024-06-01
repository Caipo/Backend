import { ClassProvider, Injectable } from "@nestjs/common";
import {
	RepoCreateMessageInput,
	RepoMessage,
	MessageRepositoryDefinition,
	MessageRepositoryName,
} from "src/modules/message/repository/message.repository.types";
import { DataSource } from "typeorm";
import { MessageRecord } from "src/core/infrastructure/entities/Message";

@Injectable()
export class MessageRepository implements MessageRepositoryDefinition {
	constructor(private dataSource: DataSource) {}

	public static Provider(): ClassProvider<MessageRepository> {
		return {
			provide: MessageRepositoryName,
			useClass: MessageRepository,
		};
	}

	async getMessages(): Promise<RepoMessage[]> {
		const messageRecords = await this.dataSource.getRepository(MessageRecord).find();
		return messageRecords.map((messageRecord) => ({
			id: messageRecord.id,
			message: messageRecord.message,
			senderId: messageRecord.senderId,
			createdAt: messageRecord.createdAt,
		}));
	}

	async createMessage({ message, createdAt }: RepoCreateMessageInput): Promise<RepoMessage> {
		const messageToSave = {
			message: message,
			createdAt: createdAt,
		};

		const savedMessageRecord = await this.dataSource.getRepository(MessageRecord).save(messageToSave);

		const repoMessage: RepoMessage = {
			id: savedMessageRecord.id,
			senderId: savedMessageRecord.senderId,
			message: savedMessageRecord.message,
			createdAt: savedMessageRecord.createdAt,
		};

		return repoMessage;
	}
}
