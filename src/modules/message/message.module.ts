import { Module } from "@nestjs/common";
import { MessageQueriesController } from "src/modules/message/api/message.queries.controller";
import { MessageMutationsController } from "src/modules/message/api/message.mutations.controller";
import { MessageService } from "src/modules/message/domain/message.service";
import { MessageServiceName } from "src/modules/message/domain/message.service.types";
import { MessageRepository } from "src/modules/message/repository/message.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageRecord } from "src/core/infrastructure/entities/Message";

@Module({
	imports: [TypeOrmModule.forFeature([MessageRecord])],
	controllers: [MessageQueriesController, MessageMutationsController],
	providers: [MessageService.Provider(), MessageRepository.Provider()],
	exports: [MessageServiceName],
})
export class MessageModule {}