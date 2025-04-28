import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 여기 중요! 전역으로 등록
    }),
    FcmModule,
  ],
})
export class AppModule {}
