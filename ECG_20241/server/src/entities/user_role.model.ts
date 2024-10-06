import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_role' })
export class UserRoleModel extends Model<UserRoleModel> {

  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  role_name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: number;
}
