import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { SchedulesModel } from "./schedules.model";

@Table({ tableName: "device_schedule" })
export class DeviceScheduleModel extends Model<DeviceScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => SchedulesModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  schedule_id: string;

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

  @BelongsTo(() => SchedulesModel)
  schedule: SchedulesModel;
}
