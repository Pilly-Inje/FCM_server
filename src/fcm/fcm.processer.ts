import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { FcmService } from './fcm.service';

@Processor('alarm')
export class FcmProcessor {
  constructor(private readonly fcmService: FcmService) {}

  @Process('sendAlarm')
  async handleSendAlarm(job: Job) {
    const { alarmTime } = job.data;
    console.log(`[LOG] 알림 전송 - 알람시간 : ${alarmTime}`);
    
    const token = '사용자디바이스토큰';
    await this.fcmService.sendPushNotification(token, 'Pilly', `복약 시간이 되었습니다! (${alarmTime})`);
  }
}