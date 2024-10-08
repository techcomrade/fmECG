import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'user_status' })
export class UserStatusModel extends Model<UserStatusModel> {

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
  status_description: string;

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
  user: UserModel[];
}
