import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { EmotionModule } from './emotion/emotion.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { InformationModule } from './information/information.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    EmotionModule,
    CategoryModule,
    InformationModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
