import { IsNotEmpty, IsString, IsInt, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ScheduleRequest {
  @ApiProperty({
    description: "Unique identifier for the schedule",
    example: "abcd1234-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: "Unique identifier for the doctor",
    example: "abcd1234-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsUUID()
  doctor_id?: string;

  @ApiProperty({
    description: "Unique identifier for the patient",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsString()
  patient_id: string;

  @ApiProperty({
    description: "Start time of the schedule (in Unix timestamp format)",
    example: 1697011200,
  })
  @IsNotEmpty()
  @IsNumber()
  schedule_start_time: bigint;

  @ApiProperty({
    description: "End time of the schedule (in Unix timestamp format)",
    example: 1697014800,
  })
  @IsNotEmpty()
  @IsNumber()
  schedule_end_time?: bigint;

  @ApiProperty({
    description: "Status ID of the schedule",
    example: 1,
  })
  @IsInt()
  status_id?: number;

  @ApiProperty({
    description: "Result of the schedule (1: success, 2: upcoming, 3: failed)",
    example: 1,
  })
  @IsInt()
  schedule_result?: number;
}
