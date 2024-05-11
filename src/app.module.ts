import { Module } from '@nestjs/common';
import {AuthModule} from "src/modules/auth/auth.module";
import {UserModule} from "src/modules/user/user.module";

@Module({
  imports: [
      AuthModule,
      UserModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
