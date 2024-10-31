import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
} from "sequelize-typescript";
import { TokenModel } from "./token.model";
import { UserModel } from "./user.model";

@Table({ tableName: "accounts" })
export class AccountModel extends Model<AccountModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasOne(() => TokenModel)
  tokens: TokenModel;

  @HasOne(() => UserModel)
  user: UserModel;
}
