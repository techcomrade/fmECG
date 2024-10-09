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
export class AccountsModel extends Model<AccountsModel> {
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
    allowNull: true,
  })
  password: string;
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @HasOne(() => TokenModel)
  tokens: TokenModel;

  @HasOne(() => UserModel)
  user: UserModel;
}
