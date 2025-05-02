import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { AlarmResponseType, getAllTokensResponseDTO, SaveTokenENTITY, SaveTokenResponseDTO } from './fcm.type';
import axios from 'axios';
import { FcmRepository } from './fcm.repository';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { FcmTokenEntity } from './fcm.entity';
import { SaveFcmTokenDto } from './dto/save-token.dto';

@Injectable()
export class FcmService {
  constructor(
    private readonly configService : ConfigService,
    private readonly fcmReposiotry : FcmRepository
  ) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'); // \n를 그냥 쓰면 nest에서는 에러 발생

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential : admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        }),
      });
    }
  }

  async sendPushNotification(
    token : string,
    title : string,
    body : string,
    data?: Record<string, string>,
  ): Promise<string> {
    const messgae : admin.messaging.Message = {
      token,
      notification : {
        title, 
        body,
      },
      data,
    };
    
    const response = await admin.messaging().send(messgae);
    console.log(`[FCM server Response] = ${response}`);
    return response;
  }

  async getTodayAlarm() : Promise<string[]> {
    const API_URL : string  = this.configService.get<string>('ALARM_API') as string;
    //TODO: 여러 사용자일 경우로 수정하기
    const response = await axios.get<AlarmResponseType>(API_URL + `/1`);
    const alarmTimes : string[] = response.data.alarm.map(alarm => alarm.alarmTime);

    return alarmTimes;
  }

  async saveToken(saveFcmTokenDto: SaveFcmTokenDto): Promise<SaveTokenResponseDTO> {
    try {
      const {user_id, token, platform} = saveFcmTokenDto;
      const existing = await this.fcmReposiotry.findByToken(token);

      if (existing) {
        if (!existing.isActive) {
          existing.isActive = true;
          await this.fcmReposiotry.save(existing);
        }

        return ResponseHelper.success( existing, '이미 등록된 토큰입니다. 활성화 상태로 업데이트되었습니다.');
      }

      const newToken: Partial<FcmTokenEntity> = { user_id, token, platform, isActive: true };

      const saved = await this.fcmReposiotry.save(newToken);
      return ResponseHelper.success(saved, '토큰을 성공적으로 저장했습니다');
    } catch (error) {
      console.error(`토큰 저장 실패 : `, error);                                                                        
      return ResponseHelper.fail('토큰 저장에 실패했습니다.');
    }
  }

  async getAllTokens() : Promise<getAllTokensResponseDTO> {
    try {
      const response : string[] = await this.fcmReposiotry.getAllTokens();
      return ResponseHelper.success(response,"모든 토큰을 성공적으로 조회했습니다");
    } catch (error) {
      console.error('모든 토큰 조회 실패 : ', error);
      return ResponseHelper.fail("모든 토큰 조회 중 에러 발생");
    }
  }

  async getTokensByUserId(userId : number) : Promise<void> {
    //TODO: userId를 이용해 토큰을 가져오는 로직 구현
  }
}
