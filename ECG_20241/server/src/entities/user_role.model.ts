import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'user_role' })
export class UserRoleModel extends Model<UserRoleModel> {

  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
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
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @HasMany(() => UserModel)
  users: UserModel[];
}
