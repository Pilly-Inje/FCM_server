import { Repository } from 'typeorm';
import { FcmTokenEntity } from './fcm.entity';
export declare class FcmRepository {
    private readonly repo;
    constructor(repo: Repository<FcmTokenEntity>);
    save(data: Partial<FcmTokenEntity>): Promise<Partial<FcmTokenEntity> & FcmTokenEntity>;
    findByToken(token: string): Promise<FcmTokenEntity | null>;
    getAllTokens(): Promise<string[]>;
}
