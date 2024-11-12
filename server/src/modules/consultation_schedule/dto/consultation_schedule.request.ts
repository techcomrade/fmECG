import { IsNotEmpty, IsUUID, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConsultationScheduleRequest {
  @ApiProperty({
    description: 'Unique identifier for the consultation schedule',
    example: 'f4289c39-ff2e-43b0-8f78-4dcc98128a16',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Foreign key reference to the schedule',
    example: 'f4289c39-ff2e-43b0-8f78-4dcc98128a16',
  })
  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @ApiProperty({
    description: 'Foreign key reference to the doctor',
    example: 'd9c78f50-ff36-4f18-bf33-8cd9ac5e3b54',
  })
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;
}
