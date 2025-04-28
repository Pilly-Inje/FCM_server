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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const fcm_service_1 = require("./fcm.service");
let FcmProcessor = class FcmProcessor {
    fcmService;
    constructor(fcmService) {
        this.fcmService = fcmService;
    }
    async handleSendAlarm(job) {
        const { alarmTime } = job.data;
        console.log(`[LOG] 알림 전송 - 알람시간 : ${alarmTime}`);
        const token = '사용자디바이스토큰';
        await this.fcmService.sendPushNotification(token, 'Pilly', `복약 시간이 되었습니다! (${alarmTime})`);
    }
};
exports.FcmProcessor = FcmProcessor;
__decorate([
    (0, bull_1.Process)('sendAlarm'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FcmProcessor.prototype, "handleSendAlarm", null);
exports.FcmProcessor = FcmProcessor = __decorate([
    (0, bull_1.Processor)('alarm'),
    __metadata("design:paramtypes", [fcm_service_1.FcmService])
], FcmProcessor);
//# sourceMappingURL=fcm.processer.js.map