import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';
import { MetricsService } from './metrics/metrics.service';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    BatchModule,
    MetricsModule,
  ],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class AppModule {}
