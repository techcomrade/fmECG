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
}
