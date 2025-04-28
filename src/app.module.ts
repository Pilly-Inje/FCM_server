import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 여기 중요! 전역으로 등록
    }),
    FcmModule,
    BatchModule,
  ],
})
export class AppModule {}
