import { Expose, Exclude, Type } from "class-transformer";
import { DeviceDetailResponse } from "../../device_details/dto/device_detail.response";

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

  @Expose()
  @Type(() => DeviceDetailResponse)
  frequency?: DeviceDetailResponse;

  @Expose()
  @Type(() => DeviceDetailResponse)
  connection?: DeviceDetailResponse;

  @Expose()
  @Type(() => DeviceDetailResponse)
  storage?: DeviceDetailResponse;
}
