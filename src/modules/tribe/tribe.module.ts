import { Module } from "@nestjs/common";
import { TribeQueriesController } from "src/modules/tribe/api/tribe.queries.controller";
import { TribeMutationsController } from "src/modules/tribe/api/tribe.mutations.controller";
import { TribeService } from "src/modules/tribe/domain/tribe.service";
import { UserService } from "src/modules/user/domain/user.service";
import { UserRepository } from "src/modules/user/repository/user.repository";
import { AuthService } from "src/modules/auth/domain/auth.service";
import { AuthRepository } from "src/modules/auth/repository/auth.repository";
import { TribeServiceName } from "src/modules/tribe/domain/tribe.service.types";
import { TribeRepository } from "src/modules/tribe/repository/tribe.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TribeRecord } from "src/core/infrastructure/entities/Tribe";

@Module({
	imports: [TypeOrmModule.forFeature([TribeRecord])],
	controllers: [TribeQueriesController, TribeMutationsController],
	providers: [
		TribeService.Provider(),
		TribeRepository.Provider(),
		AuthService.Provider(),
		AuthRepository.Provider(),
		UserService.Provider(),
		UserRepository.Provider(),
	],
	exports: [TribeServiceName],
})
export class TribeModule {}
