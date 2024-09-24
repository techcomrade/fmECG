import { Column, Model, Table, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { AccountModel } from '../../account/model/account.model';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => AccountModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  account_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  gender: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  birth: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  status: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  information: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role: number;
}
