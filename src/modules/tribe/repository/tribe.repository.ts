import { ClassProvider, Injectable } from "@nestjs/common";
import {
	RepoTribe,
	TribeRepositoryDefinition,
	TribeRepositoryName,
} from "src/modules/tribe/repository/tribe.repository.types";
import { DataSource } from "typeorm";
import { TribeRecord } from "src/core/infrastructure/entities/Tribe";

@Injectable()
export class TribeRepository implements TribeRepositoryDefinition {
	constructor(private dataSource: DataSource) {}

	public static Provider(): ClassProvider<TribeRepository> {
		return {
			provide: TribeRepositoryName,
			useClass: TribeRepository,
		};
	}

	async getTribes(): Promise<RepoTribe[]> {
		const tribeRecords = await this.dataSource.getRepository(TribeRecord).find();
		return tribeRecords.map((tribeRecord) => ({
			id: tribeRecord.id,
			tribeName: tribeRecord.tribeName,
		    about: tribeRecord.about,
			createdAt: tribeRecord.createdAt,
		}));
	}

}


