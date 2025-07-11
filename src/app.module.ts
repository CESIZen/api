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
import { EmotionTypeModule } from './emotion_type/emotion_type.module';
import { EmotionTrackerModule } from './emotion_tracker/emotion_tracker.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UserModule,
    RoleModule,
    EmotionModule,
    CategoryModule,
    InformationModule,
    UploadModule,
    EmotionTypeModule,
    EmotionTrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}