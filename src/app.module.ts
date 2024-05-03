import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import {AppService } from './app.service'
import 'dotenv/config'
// import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';


require('dotenv').config()


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      password: process.env.PASSWORD!,
      username: process.env.DB_USER!,
      entities: [User], 
      database: process.env.DB_DATABASE!,
      synchronize: true,
      logging: true,
    }),
    UserModule,
  //  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
