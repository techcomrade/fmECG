import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_status' })
export class UserStatusModel extends Model<UserStatusModel> {

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
  status_description: string;

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
