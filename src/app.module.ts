import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/user.module";
import { MessageModule } from "src/modules/message/message.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRecord } from "src/core/infrastructure/entities/User";
import { MessageRecord } from "src/core/infrastructure/entities/Message";
import { UserSessionRecord } from "src/core/infrastructure/entities/Auth";

@Module({
	imports: [
		AuthModule,
		UserModule,
		MessageModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "password",
			database: "tribal",
			entities: [UserRecord, UserSessionRecord, MessageRecord],
			migrations: ["dist/core/infrastructure/migrations/*.js"],
			retryAttempts: 3,
			migrationsRun: true,
			logging: ["schema", "migration"],
			migrationsTransactionMode: "all",
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
