import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { BatchService } from './batch.service';
import { FcmService } from 'src/fcm/fcm.service';
import { FcmModule } from 'src/fcm/fcm.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'alarm',
    }),
    FcmModule,
  ],
  providers: [BatchService, FcmService]
})
export class BatchModule {}
