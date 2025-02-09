import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateResultRequest {
  @ApiProperty({
    description: "Unique identifier for the schedule",
    example: "abcd1234-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @ApiProperty({
    description: "Result of the schedule",
    example: "1",
  })
  @IsNotEmpty()
  result: number;
}
