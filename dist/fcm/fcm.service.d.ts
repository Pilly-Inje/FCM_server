import { ConfigService } from '@nestjs/config';
import { getAllTokensResponseDTO, SaveTokenResponseDTO } from './fcm.type';
import { FcmRepository } from './fcm.repository';
export declare class FcmService {
    private readonly configService;
    private readonly fcmReposiotry;
    constructor(configService: ConfigService, fcmReposiotry: FcmRepository);
    sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<string>;
    getTodayAlarm(): Promise<string[]>;
    saveToken({ userId, token }: {
        userId: number;
        token: string;
    }): Promise<SaveTokenResponseDTO>;
    getAllTokens(): Promise<getAllTokensResponseDTO>;
    getTokensByUserId(userId: number): Promise<void>;
}
