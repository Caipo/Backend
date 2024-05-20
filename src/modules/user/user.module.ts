import { Module } from "@nestjs/common";
import { UserQueriesController } from "src/modules/user/api/user.queries.controller";
import { UserMutationsController } from "src/modules/user/api/user.mutations.controller";
import {UserService} from "src/modules/user/domain/user.service";

@Module({
	imports: [],
	controllers: [UserQueriesController, UserMutationsController],
	providers: [UserService.Provider()],
})
export class UserModule {}
