import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { BatchService } from './batch.service';
import { HttpModule } from '@nestjs/axios';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'alarm',
    }),
    HttpModule,
    MetricsModule
  ],
  providers: [BatchService]
})
export class BatchModule {}
