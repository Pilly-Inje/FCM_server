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

  async save(data: Partial<FcmTokenEntity>) {
    return this.repo.save(data);
  }

  async findByToken(token: string) {
    return this.repo.findOne({ where: { token } });
  }

  async getAllTokens(): Promise<string[]> {
    const tokens = await this.repo
    .createQueryBuilder('fcm')
    .select('fcm.token', 'token')
    .where('fcm.isActive = :active', { active: true })
    .getRawMany();
  
  const result: string[] = tokens.map(t => t.token);

  return result;
  }
}
