import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ScheduleResponse {
  @Expose()
  id: string;

  @Expose()
  patient_id: string;

  @Expose()
  schedule_start_time: number;

  @Expose()
  schedule_end_time: number;

  @Expose()
  schedule_type_id: number;

  @Expose()
  status_id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
