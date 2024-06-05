import { Controller, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { Paths } from "src/core/api/routes";
import { TribeServiceDefinition, TribeServiceName } from "src/modules/tribe/domain/tribe.service.types";

@Controller(Paths.tribe.root)
@UsePipes(new ValidationPipe())
export class TribeMutationsController {
	constructor(@Inject(TribeServiceName) private tribeService: TribeServiceDefinition) {}

}
