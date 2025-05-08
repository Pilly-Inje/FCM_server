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
exports.FcmService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
const axios_1 = require("axios");
const fcm_repository_1 = require("./fcm.repository");
const response_helper_1 = require("../common/helpers/response.helper");
let FcmService = class FcmService {
    configService;
    fcmReposiotry;
    constructor(configService, fcmReposiotry) {
        this.configService = configService;
        this.fcmReposiotry = fcmReposiotry;
        const projectId = this.configService.get('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
        const privateKey = this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey
                }),
            });
        }
    }
    async sendPushNotification(token, title, body, data) {
        const messgae = {
            token,
            notification: {
                title,
                body,
            },
            data,
        };
        const response = await admin.messaging().send(messgae);
        console.log(`[FCM server Response] = ${response}`);
        return response;
    }
    async getTodayAlarm() {
        const API_URL = this.configService.get('ALARM_API');
        const response = await axios_1.default.get(API_URL + `/1`);
        const alarmTimes = response.data.alarm.map(alarm => alarm.alarmTime);
        return alarmTimes;
    }
    async saveToken(saveFcmTokenDto) {
        try {
            const { user_id, token, platform } = saveFcmTokenDto;
            const existing = await this.fcmReposiotry.findByToken(token);
            if (existing) {
                if (!existing.isActive) {
                    existing.isActive = true;
                    await this.fcmReposiotry.save(existing);
                }
                return response_helper_1.ResponseHelper.success(existing, '이미 등록된 토큰입니다. 활성화 상태로 업데이트되었습니다.');
            }
            const newToken = { user_id, token, platform, isActive: true };
            const saved = await this.fcmReposiotry.save(newToken);
            return response_helper_1.ResponseHelper.success(saved, '토큰을 성공적으로 저장했습니다');
        }
        catch (error) {
            console.error(`토큰 저장 실패 : `, error);
            return response_helper_1.ResponseHelper.fail('토큰 저장에 실패했습니다.');
        }
    }
    async getAllTokens() {
        try {
            const response = await this.fcmReposiotry.getAllTokens();
            return response_helper_1.ResponseHelper.success(response, "모든 토큰을 성공적으로 조회했습니다");
        }
        catch (error) {
            console.error('모든 토큰 조회 실패 : ', error);
            return response_helper_1.ResponseHelper.fail("모든 토큰 조회 중 에러 발생");
        }
    }
    async getTokensByUserId(userId) {
    }
};
exports.FcmService = FcmService;
exports.FcmService = FcmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fcm_repository_1.FcmRepository])
], FcmService);
//# sourceMappingURL=fcm.service.js.map