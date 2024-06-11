export const MessageServiceName = "MessageService";

export interface MessageServiceDefinition {
	createMessage(input: ServiceCreateMessageInput): Promise<ServiceMessage>;
	getMessages(): Promise<ServiceMessage[]>;
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
    userId: string;
};
