import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { FcmService } from './fcm.service';
import { ConfigService } from '@nestjs/config';

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
    
    const token : string = this.configService.get<string>('EMULATOR_TOKEN') as string;
    const title : string = 'Pilly';
    const message : string = `복약 시간이 되었습니다! (${alarmTime})`;
    
    await this.fcmService.sendPushNotification(token, title, message);
  }
}