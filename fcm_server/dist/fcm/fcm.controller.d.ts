import { FcmService } from './fcm.service';
import { getAllTokensResponseDTO } from './fcm.type';
import { SaveFcmTokenDto } from './dto/save-token.dto';
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
    saveToken(saveFcmTokenDto: SaveFcmTokenDto): Promise<import("./fcm.type").SaveTokenResponseDTO>;
    getAllTokens(): Promise<getAllTokensResponseDTO>;
}
