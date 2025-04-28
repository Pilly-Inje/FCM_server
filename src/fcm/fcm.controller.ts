import { Body, Controller, Post } from '@nestjs/common';
import { FcmService } from './fcm.service';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService : FcmService) {}

  @Post('push')
  async sendPush(@Body() body : { token : string, title : string, message : string }) {
    const { token, title, message } = body;
    await this.fcmService.getTodayAlarm();
    const messageId = await this.fcmService.sendPushNotification(token, title, message);

    return { messageId };
  }

}
