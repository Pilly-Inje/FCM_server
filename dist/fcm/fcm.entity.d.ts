export declare class FcmTokenEntity {
    id: number;
    user_id: number;
    token: string;
    platform: 'ios' | 'android';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
