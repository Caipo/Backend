import { UserRecord } from "src/core/infrastructure/entities/User";
export const MessageRepositoryName = "MessageRepository";

export interface MessageRepositoryDefinition {
	createMessage(input: RepoCreateMessageInput): Promise<RepoMessage>;
	getMessages(): Promise<RepoMessage[]>;
}

/***** TYPES *****/
export type RepoMessage = {
	id: string;
	senderId: UserRecord;
	message: string;
	createdAt: bigint;
};

/***** INPUTS *****/
export type RepoCreateMessageInput = {
	message: string;
	createdAt: bigint;
};
