import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { UserRoleModel } from "./user_role.model";
import { UserStatusModel } from "./user_status.model";
import { AccountModel } from "./account.model";
import { DeviceModel } from "./device.model";
import { ScheduleModel } from "./schedule.model";
import { ConsultationScheduleModel } from "./consultation_schedule.model";
import { RecordModel } from "./record.model";

@Table({ tableName: "users" })
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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  information: string;

  @Column({
    type: DataType.DATE,
    
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => UserStatusModel)
  status: UserStatusModel;

  @BelongsTo(() => UserRoleModel)
  user_role: UserRoleModel;

  @BelongsTo(() => UserStatusModel)
  user_status: UserStatusModel;

  @HasMany(() => DeviceModel)
  devices: DeviceModel[];

  @HasMany(() => RecordModel)
  records: RecordModel[];

  @HasMany(() => ScheduleModel)
  schedules: ScheduleModel[];

  @HasMany(() => ConsultationScheduleModel)
  consultation_schedules: ConsultationScheduleModel[];
}
