import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    BatchModule,
  ],
})
export class AppModule {}
