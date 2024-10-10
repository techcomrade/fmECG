import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { ScheduleModel } from "./schedule.model";
import { DeviceModel } from "./device.model";

@Table({ tableName: "device_schedule" })
export class DeviceScheduleModel extends Model<DeviceScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => ScheduleModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  schedule_id: string;

  @ForeignKey(() => DeviceModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  device_id: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => DeviceModel)
  device: DeviceModel;

  @BelongsTo(() => ScheduleModel)
  schedule: ScheduleModel;
}
