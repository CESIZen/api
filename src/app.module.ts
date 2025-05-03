import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule} from './user/user.module';
import {RoleModule} from "./role/role.module";
import {EmotionModule} from "./emotion/emotion.module";
import { AuthModule} from "./auth/auth.module";

@Module({
  imports: [AuthModule, UserModule, RoleModule, EmotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
