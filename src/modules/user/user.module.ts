import { Module } from "@nestjs/common";
import { UserQueriesController } from "src/modules/user/api/user.queries.controller";
import { UserMutationsController } from "src/modules/user/api/user.mutations.controller";
import { UserService } from "src/modules/user/domain/user.service";
import { UserServiceName } from "src/modules/user/domain/user.service.types";
import { UserRepository } from "src/modules/user/repository/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRecord } from "src/core/infrastructure/entities/User";

@Module({
	imports: [TypeOrmModule.forFeature([UserRecord])],
	controllers: [UserQueriesController, UserMutationsController],
	providers: [UserService.Provider(), UserRepository.Provider()],
	exports: [UserServiceName],
})
export class UserModule {}
