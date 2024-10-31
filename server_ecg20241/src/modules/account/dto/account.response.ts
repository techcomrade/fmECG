import { Expose, Exclude } from "class-transformer";

@Exclude()
export class AccountResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
