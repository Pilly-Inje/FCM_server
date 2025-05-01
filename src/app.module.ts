import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 여기 중요! 전역으로 등록
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    FcmModule,
    BatchModule,
  ],
})
export class AppModule {}
