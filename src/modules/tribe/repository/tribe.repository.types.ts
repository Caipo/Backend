export const TribeRepositoryName = "TribeRepository";
export interface TribeRepositoryDefinition {
	getTribes(): Promise<RepoTribe[]>;
}

/***** TYPES *****/
export type RepoTribe = {
    id: string,
    tribeName: string,
    about: string,
    createdAt: bigint,
};

/***** INPUTS *****/
