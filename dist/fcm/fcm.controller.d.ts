import { FcmService } from './fcm.service';
import { getAllTokensResponseDTO } from './fcm.type';
export declare class FcmController {
    private readonly fcmService;
    constructor(fcmService: FcmService);
    sendPush(body: {
        token: string;
        title: string;
        message: string;
    }): Promise<{
        messageId: string;
    }>;
    getAllTokens(): Promise<getAllTokensResponseDTO>;
}
