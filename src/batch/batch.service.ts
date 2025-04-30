import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FcmService } from 'src/fcm/fcm.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name); 

  constructor(
    private readonly fcmService: FcmService,
    @InjectQueue('alarm') private readonly alarmQueue: Queue,
  ) {}

  // 매일 자정 
  @Cron('0 * * * * *')
  async registerAlarmsAtMidnight() {
    this.logger.log('[자정 스케줄 시작] 오늘 알림 등록 중...');
    try {
      const alarmTimes = await this.fcmService.getTodayAlarm();

      for (const alarmTime of alarmTimes) {
        const delay = this.calculateDelay(alarmTime);

        await this.alarmQueue.add('sendAlarm', {
          alarmTime,
        }, {
          delay,
          jobId: `alarm-${alarmTime}`,
        });

        this.logger.log(`등록된 알람: ${alarmTime}`);
      }

      this.logger.log('[자정 스케줄 완료] 알림 등록 끝!');
    } catch (error) {
      this.logger.error('[자정 스케줄 실패]', error.stack);
    }
  }

  // 매분 55초마다 알람 변경사항 체크
  @Cron('55 * * * * *')
  async checkForUpdates() {
    this.logger.log('[55초 스케줄 시작] 알람 변경사항 체크 시작...');
    try {
      const latestAlarms = await this.fcmService.getTodayAlarm();
      const jobs = await this.alarmQueue.getDelayed();

      const currentJobTimes = jobs.map(job => job.data.alarmTime);
      const latestAlarmTimes = latestAlarms;

      const alarmsToAdd = latestAlarmTimes.filter(time => !currentJobTimes.includes(time));
      const alarmsToRemove = currentJobTimes.filter(time => !latestAlarmTimes.includes(time));

      for (const alarmTime of alarmsToRemove) {
        const job = await this.alarmQueue.getJob(`alarm-${alarmTime}`);
        if (job) {
          await job.remove();
          this.logger.log(`❌ 삭제 완료: ${alarmTime}`);
        }
      }

      for (const alarmTime of alarmsToAdd) {
        const delay = this.calculateDelay(alarmTime);
        if (delay > 0) {
          await this.alarmQueue.add('sendAlarm', {
            alarmTime,
          }, {
            delay,
            jobId: `alarm-${alarmTime}`,
          });
          this.logger.log(`✅ 새 알람 등록 완료: ${alarmTime}`);
        }
      }

      this.logger.log('🚨 [55초 스케줄 완료] 알람 변경사항 체크 끝!');
    } catch (error) {
      this.logger.error('❌ [55초 스케줄 실패]', error.stack);
    }
  }

  // 현재 시간과 알람 시간 간 차이(ms) 계산
  private calculateDelay(alarmTime: string): number {
    const [hours, minutes] = alarmTime.split(':').map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    const delay = target.getTime() - now.getTime();
    return delay > 0 ? delay : 0; // 음수 방지
  }
}
