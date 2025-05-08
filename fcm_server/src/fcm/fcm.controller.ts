import { Body, Controller, Get, Post } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { getAllTokensResponseDTO } from './fcm.type';
import { SaveFcmTokenDto } from './dto/save-token.dto';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService : FcmService) {}

  @Post('push')
  async sendPush(@Body() body : { token : string, title : string, message : string }) {
    const { token, title, message } = body;
    const messageId = await this.fcmService.sendPushNotification(token, title, message);

    return { messageId };
  }

  @Post('token')
  async saveToken(@Body() saveFcmTokenDto: SaveFcmTokenDto) {
    return this.fcmService.saveToken(saveFcmTokenDto);
  }

  @Get('all')
  async getAllTokens() : Promise<getAllTokensResponseDTO>{
    return await this.fcmService.getAllTokens();
  }

  @Get('todayAlarm')
  async getTodayAlarm() : Promise<string[]>{
    return await this.fcmService.getTodayAlarm();
  }
  
}
