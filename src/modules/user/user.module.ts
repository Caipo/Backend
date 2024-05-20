import { Module } from "@nestjs/common";
import { UserQueriesController } from "src/modules/user/api/user.queries.controller";
import { UserMutationsController } from "src/modules/user/api/user.mutations.controller";

@Module({
	imports: [],
	controllers: [UserQueriesController, UserMutationsController],
	providers: [],
})
export class UserModule {}
