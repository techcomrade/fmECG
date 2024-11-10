import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ScheduleResponse {
  @Expose()
  id: string;

  @Expose()
  patient_id: string;

  @Expose()
  patient_name?: string;

  @Expose()
  doctor_name?: string;

  @Expose()
  schedule_start_time: bigint;

  @Expose()
  schedule_end_time: bigint;

  @Expose()
  schedule_type_id: number;

  @Expose()
  status_id: number;
}
