import { Controller, Inject, Headers, Get } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { GetTribeHeaders } from "src/modules/tribe/api/tribe.queries.inputs";
import { ApiTribe } from "src/modules/tribe/api/tribe.types";
import { TribeServiceDefinition, TribeServiceName } from "src/modules/tribe/domain/tribe.service.types";

@Controller(Paths.tribe.root)
export class TribeQueriesController {
	constructor(@Inject(TribeServiceName) private tribeService: TribeServiceDefinition) {}

	@Get(Paths.tribe.queries.getTribes)
	async getMessages(@Headers() headers: GetTribeHeaders): Promise<ApiTribe[]> {
		return this.tribeService.getTribes({ token: headers.csrf });
	}
}
