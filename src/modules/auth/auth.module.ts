import { Module } from "@nestjs/common";
import { AuthQueriesController } from "src/modules/auth/api/auth.queries.controller";
import { AuthMutationsController } from "src/modules/auth/api/auth.mutations.controllers";
import { AuthService } from "src/modules/auth/domain/auth.service";
import { AuthRepository } from "src/modules/auth/repository/auth.repository";
import { UserService } from "src/modules/user/domain/user.service";
import { UserRepository } from "src/modules/user/repository/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSessionRecord } from "src/core/infrastructure/entities/Auth";

@Module({
	imports: [TypeOrmModule.forFeature([UserSessionRecord])],
	controllers: [AuthQueriesController, AuthMutationsController],
	providers: [AuthService.Provider(), AuthRepository.Provider(), UserService.Provider(), UserRepository.Provider()],
})
export class AuthModule {}
