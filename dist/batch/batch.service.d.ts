import { Queue } from 'bull';
import { FcmService } from 'src/fcm/fcm.service';
export declare class BatchService {
    private readonly fcmService;
    private readonly alarmQueue;
    private readonly logger;
    constructor(fcmService: FcmService, alarmQueue: Queue);
    registerAlarmsAtMidnight(): Promise<void>;
    checkForUpdates(): Promise<void>;
    private calculateDelay;
}
