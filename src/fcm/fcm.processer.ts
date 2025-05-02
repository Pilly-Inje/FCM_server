import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { FcmService } from './fcm.service';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';

@Processor('alarm')
export class FcmProcessor {
  constructor(
    private readonly fcmService: FcmService,
    private readonly configService : ConfigService 
  ) {}

  @Process('sendAlarm')
  async handleSendAlarm(job: Job) {
    const { alarmTime } = job.data;
    console.log(`[LOG] 알림 전송 - 알람시간 : ${alarmTime}`);

    const tokens : string[] = (await this.fcmService.getAllTokens()).data as string[];
    const title : string = 'Pilly';
    const message : string = `복약 시간이 되었습니다! (${alarmTime})`;

    if(tokens.length === 0) {
      console.log('[LOG - fcm_processer] 토큰이 없습니다');
    } else {
      await Promise.all(
        tokens.map(async token => {
          await this.fcmService.sendPushNotification(token, title, message);
          console.log(`[LOG][PUSH_NOTIFICATION] 전송 완료 : ${token}`);
        }),
      );      
    }
  }
}