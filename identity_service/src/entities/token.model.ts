import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { AccountModel } from './account.model';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'token' })
export class TokenModel extends Model<TokenModel> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.STRING(255),
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ForeignKey(() => AccountModel)
  @Column({
    type: DataType.STRING(255),
  })
  account_id: string;

  @BelongsTo(() => AccountModel)
  account: AccountModel;

  @Column({
    type: DataType.STRING(500),
  })
  refresh_token: string;

  @Column({
    type: DataType.DATE,
    allowNull: true, // Có thể cho phép null nếu cần
  })
  expiredAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isExpired: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
