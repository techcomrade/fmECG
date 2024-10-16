import { Expose, Exclude } from "class-transformer";

@Exclude()
export class AccountResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

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

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
