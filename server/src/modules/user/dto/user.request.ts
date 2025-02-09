import { IsNotEmpty, IsUUID, IsString, IsInt, IsOptional, IsUrl, IsPhoneNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'f4289c39-ff2e-43b0-8f78-4dcc98128a16',
  })
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'Account ID associated with the user',
    example: 'f4289c39-ff2e-43b0-8f78-4dcc98128a16',
  })
  // @IsNotEmpty()
  @IsUUID()
  account_id?: string;

  @ApiProperty({
    description: 'email',
    example: 'dnthang300@gmail.com',
  })
  @IsNotEmpty()
  @IsUUID()
  email: string;

  @ApiProperty({
    description: 'password',
    example: '123456a@',
  })
  @IsNotEmpty()
  @IsUUID()
  password: string;

  @ApiProperty({
    description: 'Username for the user',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Gender of the user, represented by an integer (e.g., 0 for male, 1 for female)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  gender?: number;

  @ApiProperty({
    description: 'Birth date of the user in ISO format',
    example: '123123123123',
  })
  @IsOptional()
  @IsDateString()
  birth?: bigint;

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
