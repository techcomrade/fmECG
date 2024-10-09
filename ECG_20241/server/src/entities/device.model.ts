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
import { UserModel } from "./user.model";
import { DeviceTypeModel } from "./device_type.model";
import { DeviceStatusModel } from "./device_status.model";
import { DeviceDetailModel } from "./device_detail.model";
import { DeviceScheduleModel } from "./device_schedule.model";
import { RecordModel } from "./record.model";

@Table({ tableName: "devices" })
export class DeviceModel extends Model<DeviceModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctor_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  device_name: string;

  @Column({
    type: DataType.TEXT,
  })
  information: string;

  @ForeignKey(() => DeviceTypeModel)
  @Column({
    type: DataType.INTEGER,
  })
  device_type_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  start_date: number;

  @ForeignKey(() => DeviceStatusModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  status_id: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => UserModel)
  doctor: UserModel;

  @BelongsTo(() => DeviceStatusModel)
  device_status: DeviceStatusModel;

  @BelongsTo(() => DeviceTypeModel)
  device_type: DeviceTypeModel;

  // @HasMany(() => DeviceDetailModel)
  // device_details: DeviceDetailModel[];

  // @HasMany(() => DeviceScheduleModel)
  // device_schedules: DeviceScheduleModel[];

  // @HasMany(() => RecordModel)
  // records: RecordModel[];
}
