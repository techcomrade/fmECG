import { IsNotEmpty, IsUUID, IsDate, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RecordRequest {
  @ApiProperty({
    description: "The unique identifier for the record",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "The unique identifier for the user",
    example: "f4289c39-ff2e-43b0-8f78-4dcc98128a16",
  })
  @IsNotEmpty()
  @IsUUID()
  patient_id: string;

  @ApiProperty({
    description: "The unique identifier for the device",
    example: "987e6543-a21b-23d5-f456-5566b8774321",
  })
  @IsNotEmpty()
  @IsUUID()
  device_id: string;

  @ApiProperty({
    description: "The unique identifier for the schedule",
    example: "234e5678-f89a-34d7-b456-123d89653000",
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @ApiProperty({
    description: "Start time of the recording session",
    example: "20241003092312",
  })
  @IsNotEmpty()
  start_time: bigint;

  @ApiProperty({
    description: "End time of the recording session",
    example: "20241003092312",
  })
  @IsNotEmpty()
  @IsDate()
  end_time: bigint;

  @ApiProperty({
    description: "URL of the recorded data",
    example: "https://sparc.com/data/record1",
  })
  @IsNotEmpty()
  @IsUrl()
  data_rec_url: string;
}
