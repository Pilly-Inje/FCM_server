import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FcnController } from './fcn/fcn.controller';
import { FcmController } from './fcm/fcm.controller';
import { FcmService } from './fcm/fcm.service';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [FcmModule],
  controllers: [AppController, FcnController, FcmController],
  providers: [AppService, FcmService],
})
export class AppModule {}
