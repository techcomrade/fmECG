import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'accounts' })
export class AccountModel extends Model<AccountModel> {

  @PrimaryKey
  @Column({
    type: DataType.STRING(255), 
    allowNull: false
  })
  id: string;

  @Column({
    type: DataType.STRING(255), 
    allowNull: false, 
    validate: {
        isEmail: true, 
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false, 
  })
  password: string;

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
