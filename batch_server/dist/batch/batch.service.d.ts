import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
export declare class BatchService {
    private readonly alarmQueue;
    private readonly configService;
    private readonly logger;
    constructor(alarmQueue: Queue, configService: ConfigService);
    registerAlarmsAtMidnight(): Promise<void>;
    checkForUpdates(): Promise<void>;
    private calculateDelay;
}
