import { Expose, Exclude, Type } from "class-transformer";

@Exclude()
export class UnassignDeviceRequest {
  @Expose()
  id: string;

  @Expose()
  user_id?: string;
}
