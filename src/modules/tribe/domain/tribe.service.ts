import { ClassProvider, Inject, Injectable } from "@nestjs/common";
import {
	ServiceGetTribesInput,
	ServiceTribe,
	TribeServiceDefinition,
	TribeServiceName,
} from "src/modules/tribe/domain/tribe.service.types";
import { AuthServiceDefinition, AuthServiceName } from "src/modules/auth/domain/auth.service.types";
import {
	RepoTribe,
	TribeRepositoryDefinition,
	TribeRepositoryName,
} from "src/modules/tribe/repository/tribe.repository.types";

@Injectable()
export class TribeService implements TribeServiceDefinition {
	constructor(
		@Inject(TribeRepositoryName) private readonly tribeRepository: TribeRepositoryDefinition,
		@Inject(AuthServiceName) private authService: AuthServiceDefinition,
	) {}

	public static Provider(): ClassProvider<TribeService> {
		return {
			provide: TribeServiceName,
			useClass: TribeService,
		};
	}

	async getTribes({ token }: ServiceGetTribesInput): Promise<ServiceTribe[]> {
		const authCode = await this.authService.checkToken({ token });

		const repoTribes: RepoTribe[] = await this.tribeRepository.getTribes();

		return repoTribes.map((repoTribe) => ({
			id: repoTribe.id,
			tribeName: repoTribe.tribeName,
            about: repoTribe.about,
			createdAt: repoTribe.createdAt,
		}));
	}

}
