import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';
import { BullModule } from '@nestjs/bull';
import { FcmProcessor } from './fcm.processer';
import { FcmRepository } from './fcm.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'alarm', // Processor와 동일한 Queue 이름
    }),
  ],
  providers : [FcmService, FcmProcessor, FcmRepository],
  exports : [FcmRepository],
  controllers : [FcmController],
})
export class FcmModule {}
