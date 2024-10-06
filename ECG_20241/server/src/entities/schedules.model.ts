import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { DeviceScheduleModel } from "./device_schedule.model"
import { DiagnosisModel } from "./diagnosis.model"
import { RecurringScheduleModel } from "./recurring_schedule.model"

@Table({ tableName: "schedules" })
export class SchedulesModel extends Model<SchedulesModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  patient_id: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  schedule_start_time: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  schedule_end_time: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  schedule_type_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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

  @HasMany(() => DeviceScheduleModel)
  device_schedules: DeviceScheduleModel[];

  @HasMany(() => DiagnosisModel)
  diagnosis: DiagnosisModel[];

  @HasMany(() => RecurringScheduleModel)
  recurring_schedules: RecurringScheduleModel[];
}
