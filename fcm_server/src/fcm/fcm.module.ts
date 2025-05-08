import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';
import { BullModule } from '@nestjs/bull';
import { FcmProcessor } from './fcm.processer';
import { FcmRepository } from './fcm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmTokenEntity } from './fcm.entity';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'alarm',
    }),
    TypeOrmModule.forFeature([FcmTokenEntity]),
  ],
  controllers: [FcmController],
  providers: [
    FcmService,
    FcmProcessor,
    FcmRepository,
  ],
  exports: [FcmRepository],
})
export class FcmModule {}

