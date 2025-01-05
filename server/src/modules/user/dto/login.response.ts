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

export class LoginResponseModel {
  @ApiProperty({
    description: "token",
    example: "skjdfhjkdsfjdguygfahdfjkahsug3ut367hrueior634i",
  })
  @IsNotEmpty()
  access_token: string;
  @ApiProperty({
    description: "expritime",
    example: "123123124",
  })
  expired_time?: number;
  @ApiProperty({
    description: "role",
    example: "1",
  })
  role?: number;
}
