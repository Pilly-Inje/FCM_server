import { ConfigService } from '@nestjs/config';
export declare class FcmService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<string>;
    getTodayAlarm(): Promise<string[]>;
}
