import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DiagnosisRequest {
  @ApiProperty({
    description: "Unique identifier for the diagnosis",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  id?: string;

  @ApiProperty({
    description: "Foreign key reference to the schedule",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @ApiProperty({
    description: "Information about the diagnosis",
    example: "Got cancer",
  })
  @IsNotEmpty()
  @IsString()
  information: string;
}
