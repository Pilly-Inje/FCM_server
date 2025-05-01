export declare class FcmTokenEntity {
    id: number;
    userid: number;
    token: string;
    platform: 'ios' | 'android';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
