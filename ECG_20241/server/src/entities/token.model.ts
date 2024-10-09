import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
// import { AccountModel } from "./account.model";

@Table({ tableName: "tokens" })
export class TokenModel extends Model<TokenModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
  })
  id: string;

  //@ForeignKey(() => AccountModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  account_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  access_token: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  refresh_token: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  expires_at: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  // @BelongsTo(() => AccountModel)
  // account: AccountModel;
}
