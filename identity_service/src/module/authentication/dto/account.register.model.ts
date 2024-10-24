import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AccountRegisterModel {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  role?: number;
}
