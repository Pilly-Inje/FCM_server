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
let FcmService = class FcmService {
    configService;
    constructor(configService) {
        this.configService = configService;
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
};
exports.FcmService = FcmService;
exports.FcmService = FcmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FcmService);
//# sourceMappingURL=fcm.service.js.map