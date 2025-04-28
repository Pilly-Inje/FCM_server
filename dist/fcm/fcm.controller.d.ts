import { FcmService } from './fcm.service';
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
}
