import { IsNotEmpty, IsUUID, IsString, IsInt, IsOptional, IsUrl, IsPhoneNumber, IsDateString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountRequest {
  @ApiProperty({
    description: 'Unique identifier for the account',
    example: 'f4289c39-ff2e-43b0-8f78-4dcc98128a16',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Email of the account',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'aGrCTD8',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+84901234567',
  })
  @IsOptional()
  @IsPhoneNumber('VN')
  phone_number?: string;

  @ApiProperty({
    description: 'URL of the user\'s profile image',
    example: 'https://example.com/images/profile.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: 'User status ID (e.g., active, suspended)',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  status_id: number;

  @ApiProperty({
    description: 'Additional information about the user',
    example: 'Some bio or information about the user',
  })
  @IsOptional()
  @IsString()
  information?: string;

  @ApiProperty({
    description: 'Role ID associated with the user',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  role_id: number;
}
