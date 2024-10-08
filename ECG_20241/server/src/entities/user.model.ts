import { Column, Model, Table, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserRoleModel } from './user_role.model';
import { UserStatusModel } from './user_status.model';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {

  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  id: string;

  // @Column({
  //   type: DataType.STRING(255),
  //   allowNull: false,
  //   validate: {
  //       isEmail: true,
  //   },
  // })
  // email: string;

  // @Column({
  //   type: DataType.STRING(255),
  //   allowNull: false,
  // })
  // password: string;

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

  @ForeignKey(() => UserRoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @ForeignKey(() => UserStatusModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;

  @BelongsTo(() => UserStatusModel)
  user_status: UserStatusModel;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  information: string;

  @Column({
    type: DataType.DATE
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE
  })
  updatedAt: Date;

  @BelongsTo(() => UserRoleModel)
  user_role: UserRoleModel;
  
  @BelongsTo(() => UserStatusModel)
  user_status: UserStatusModel;
}
