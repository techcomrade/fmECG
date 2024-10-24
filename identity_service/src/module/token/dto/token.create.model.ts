import { IsOptional, IsString, IsNotEmpty, IsDate } from 'class-validator';
export class CreateTokenModel {
  @IsNotEmpty()
  @IsString()
  account_id: string;
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
  @IsOptional()
  @IsDate()
  expiredAt?: Date;
  @IsOptional()
  @IsDate()
  isExpired?: boolean;
}
