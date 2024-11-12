import { IsNotEmpty, IsString, IsInt, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AvailablTimeRequest {
  @ApiProperty({
    description: "Unique identifier for the schedule",
    example: "abcd1234-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  date?: string;

}