export const TribeServiceName = "TribeService";

export interface TribeServiceDefinition {
	getTribes(input: ServiceGetTribesInput): Promise<ServiceTribe[]>;
}

/***** TYPES *****/
export type ServiceTribe = {
	id: string;
	tribeName: string;
	about: string;
	createdAt: bigint;
};

/***** INPUTS *****/
export type ServiceGetTribesInput = {
	token: string;
};
