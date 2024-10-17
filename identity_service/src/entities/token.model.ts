import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'token' })
export class TokenModel extends Model<TokenModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
  })
  account_id: string;

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
