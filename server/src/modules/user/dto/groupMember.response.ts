import { Expose, Exclude } from "class-transformer";

@Exclude()
export class GroupMemberResponse {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  role_id: number;
}
