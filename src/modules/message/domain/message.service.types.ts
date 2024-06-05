export const MessageServiceName = "MessageService";

export interface MessageServiceDefinition {
	createMessage(input: ServiceCreateMessageInput): Promise<ServiceMessage>;
	getMessages(input: ServiceGetMessageInput): Promise<ServiceMessage[]>;
}

/***** TYPES *****/
export type ServiceMessage = {
	id: string;
    senderId: string;
	message: string;
	createdAt: bigint;
};

/***** INPUTS *****/
export type ServiceCreateMessageInput = {
	message: string;
	token: string;
};

export type ServiceGetMessageInput = {
	token: string;
};
