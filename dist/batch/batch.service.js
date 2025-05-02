"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const fcm_service_1 = require("../fcm/fcm.service");
const schedule_1 = require("@nestjs/schedule");
let BatchService = BatchService_1 = class BatchService {
    fcmService;
    alarmQueue;
    logger = new common_1.Logger(BatchService_1.name);
    constructor(fcmService, alarmQueue) {
        this.fcmService = fcmService;
        this.alarmQueue = alarmQueue;
    }
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
        }
        catch (error) {
            this.logger.error('[자정 스케줄 실패]', error.stack);
        }
    }
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
        }
        catch (error) {
            this.logger.error('❌ [55초 스케줄 실패]', error.stack);
        }
    }
    calculateDelay(alarmTime) {
        const [hours, minutes] = alarmTime.split(':').map(Number);
        const now = new Date();
        const target = new Date();
        target.setHours(hours, minutes, 0, 0);
        const delay = target.getTime() - now.getTime();
        return delay > 0 ? delay : 0;
    }
};
exports.BatchService = BatchService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BatchService.prototype, "registerAlarmsAtMidnight", null);
__decorate([
    (0, schedule_1.Cron)('55 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BatchService.prototype, "checkForUpdates", null);
exports.BatchService = BatchService = BatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bull_1.InjectQueue)('alarm')),
    __metadata("design:paramtypes", [fcm_service_1.FcmService, Object])
], BatchService);
//# sourceMappingURL=batch.service.js.map