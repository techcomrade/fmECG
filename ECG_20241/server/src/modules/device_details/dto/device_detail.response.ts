import { Expose, Exclude } from "class-transformer";

@Exclude()
export class DeviceDetailResponse {
  @Expose()
  detail_name: string;

  @Expose()
  value: string;

  @Expose()
  information: string;
}
