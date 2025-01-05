import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsUrl,
  IsPhoneNumber,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestModel {
  @ApiProperty({
    description: "email",
    example: "son@gmail.com",
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: "password",
    example: "asc",
  })
  @IsNotEmpty()
  password: string;
}
