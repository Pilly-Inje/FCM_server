// fcm/dto/save-token.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

export class SaveFcmTokenDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsIn(['ios', 'android'])
  platform: 'ios' | 'android';
}
