import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenRequest {
  @ApiProperty({ example: "test@gmail.com", description: 'The unique identifier for the user' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @ApiProperty({ example: "test@gmail.com", description: 'The unique identifier for the user' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}
