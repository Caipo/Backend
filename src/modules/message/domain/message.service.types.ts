export const MessageServiceName = "MessageService";

export interface MessageServiceDefinition {
	createMessage(input: ServiceCreateMessageInput): Promise<ServiceMessage>;
	getMessages(): Promise<ServiceMessage[]>;
}

/***** TYPES *****/
export type ServiceMessage = {
	id: string;
	message: string;
	createdAt: bigint;
};

/***** INPUTS *****/
export type ServiceCreateMessageInput = {
	message: string;
};
