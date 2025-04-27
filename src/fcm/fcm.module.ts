import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';

@Module({
  imports : [ConfigModule],
  providers : [FcmService],
  controllers : [FcmController],
})
export class FcmModule {}
