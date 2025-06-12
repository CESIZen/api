import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InformationController],
  providers: [InformationService, PrismaService],
})
export class InformationModule {}
