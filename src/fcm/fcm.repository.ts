import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmTokenEntity } from './fcm.entity';

@Injectable()
export class FcmRepository {
  constructor(
    @InjectRepository(FcmTokenEntity)
    private readonly repo: Repository<FcmTokenEntity>,
  ) {}

  async saveToken(userId: number, token: string) {
    return this.repo.save({ userId, token });
  }

  async findByToken(token: string) {
    return this.repo.findOne({ where: { token } });
  }

  async findTokensByUserId(userId: number): Promise<string[]> {
    const tokens = await this.repo
      .createQueryBuilder('fcm')
      .select('fcm.token')
      .where('fcm.userId = :userId', { userId })
      .andWhere('fcm.isActive = :active', { active: true })
      .getRawMany();

    const result : string[] = tokens.map(t => t.fcm_token);
  
    return result;
  }
}
