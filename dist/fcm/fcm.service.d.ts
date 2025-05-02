import { ConfigService } from '@nestjs/config';
import { getAllTokensResponseDTO, SaveTokenResponseDTO } from './fcm.type';
import { FcmRepository } from './fcm.repository';
import { SaveFcmTokenDto } from './dto/save-token.dto';
export declare class FcmService {
    private readonly configService;
    private readonly fcmReposiotry;
    constructor(configService: ConfigService, fcmReposiotry: FcmRepository);
    sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<string>;
    getTodayAlarm(): Promise<string[]>;
    saveToken(saveFcmTokenDto: SaveFcmTokenDto): Promise<SaveTokenResponseDTO>;
    getAllTokens(): Promise<getAllTokensResponseDTO>;
    getTokensByUserId(userId: number): Promise<void>;
}
