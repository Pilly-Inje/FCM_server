import { Job } from 'bull';
import { FcmService } from './fcm.service';
export declare class FcmProcessor {
    private readonly fcmService;
    constructor(fcmService: FcmService);
    handleSendAlarm(job: Job): Promise<void>;
}
