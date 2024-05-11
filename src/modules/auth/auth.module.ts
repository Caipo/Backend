import {Module} from "@nestjs/common";
import {AuthQueriesController} from "src/modules/auth/api/auth.queries.controller";
import {AuthMutationsController} from "src/modules/auth/api/auth.mutations.controllers";

@Module(
    {
        imports: [],
        controllers: [AuthQueriesController, AuthMutationsController],
        providers: [],
    }
)
export class AuthModule {}