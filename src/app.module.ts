import { Module } from '@nestjs/common';
import {AuthModule} from "src/modules/auth/auth.module";
import {UserModule} from "src/modules/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      AuthModule,
      UserModule,
      TypeOrmModule.forRoot(
          {
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'password',
              database: 'tribal',
              entities: [],
              synchronize: true,
          }
      )
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
