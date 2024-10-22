import { Expose, Exclude } from "class-transformer";

@Exclude()
export class DeviceResponse {
  @Expose()
  id: string;

  @Expose()
  doctor_id: string;

  @Expose()
  doctor_name?: string;

  @Expose()
  device_name: string;

  @Expose()
  information: string;

  @Expose()
  device_type_id: number;

  @Expose()
  status_id: number;

  @Expose()
  start_date: number;
}
