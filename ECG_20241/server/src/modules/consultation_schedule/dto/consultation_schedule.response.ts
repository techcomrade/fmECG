import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ConsultationScheduleResponse {
  @Expose()
  id: string;

  @Expose()
  schedule_id: string;

  @Expose()
  doctor_id: string;
}
