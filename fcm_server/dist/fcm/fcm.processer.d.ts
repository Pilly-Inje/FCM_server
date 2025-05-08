import { Job } from 'bull';
import { FcmService } from './fcm.service';
import { ConfigService } from '@nestjs/config';
export declare class FcmProcessor {
    private readonly fcmService;
    private readonly configService;
    constructor(fcmService: FcmService, configService: ConfigService);
    handleSendAlarm(job: Job): Promise<void>;
}
