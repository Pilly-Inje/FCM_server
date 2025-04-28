import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { BatchService } from './batch.service';
import { FcmService } from 'src/fcm/fcm.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'alarm',
    }),
  ],
  providers: [BatchService, FcmService]
})
export class BatchModule {}
