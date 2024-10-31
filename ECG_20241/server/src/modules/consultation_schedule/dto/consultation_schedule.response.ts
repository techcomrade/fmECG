import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ConsultationScheduleResponse {
  @Expose()
  id: number;

  @Expose()
  schedule_id: string;

  @Expose()
  doctor_id: string;
}
