import { Module } from "@nestjs/common";
import { MessageQueriesController } from "src/modules/message/api/message.queries.controller";
import { MessageMutationsController } from "src/modules/message/api/message.mutations.controller";
import { MessageService } from "src/modules/message/domain/message.service";
import { UserService } from "src/modules/user/domain/user.service";
import { UserRepository } from "src/modules/user/repository/user.repository";
import { AuthService } from "src/modules/auth/domain/auth.service";
import { AuthRepository } from "src/modules/auth/repository/auth.repository";
import { MessageServiceName } from "src/modules/message/domain/message.service.types";
import { MessageRepository } from "src/modules/message/repository/message.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageRecord } from "src/core/infrastructure/entities/Message";

@Module({
	imports: [TypeOrmModule.forFeature([MessageRecord])],
	controllers: [MessageQueriesController, MessageMutationsController],
	providers: [
		MessageService.Provider(),
		MessageRepository.Provider(),
		AuthService.Provider(),
		AuthRepository.Provider(),
		UserService.Provider(),
		UserRepository.Provider(),
	],
	exports: [MessageServiceName],
})
export class MessageModule {}
