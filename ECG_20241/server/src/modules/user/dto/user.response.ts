import { Expose, Exclude } from "class-transformer";

@Exclude()
export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  account_id: string;

  @Expose()
  username: string;

  @Expose()
  gender?: number;

  @Expose()
  birth?: bigint;

  @Expose()
  phone_number?: string;

  @Expose()
  image?: string;

  @Expose()
  status_id: number;

  @Expose()
  information?: string;

  @Expose()
  role_id: number;
}
