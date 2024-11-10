import { Expose, Exclude } from "class-transformer";

@Exclude()
export class DiagnosisResponse {
  @Expose()
  id: string;

  @Expose()
  schedule_id: string;

  @Expose()
  information: string;
}
