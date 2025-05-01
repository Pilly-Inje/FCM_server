import { Repository } from 'typeorm';
import { FcmTokenEntity } from './fcm.entity';
export declare class FcmRepository {
    private readonly repo;
    constructor(repo: Repository<FcmTokenEntity>);
    saveToken(userId: number, token: string): Promise<{
        userId: number;
        token: string;
    } & FcmTokenEntity>;
    findByToken(token: string): Promise<FcmTokenEntity | null>;
    getAllTokens(): Promise<string[]>;
}
