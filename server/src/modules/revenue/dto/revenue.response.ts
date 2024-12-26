

import { Expose, Exclude } from "class-transformer";

@Exclude()
export class RevenueResponse {
  @Expose()
  id: string;

  @Expose()
  schedule_id: string;

  @Expose()
  schedule_type: number;

  @Expose()
  patient_id: string;

  @Expose()
  doctor_id: string;

  @Expose()
  serviceType: number;

  @Expose()
  fee: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;


}