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
import { RecurrenceTypeModel } from "./recurrence_type.model"

@Table({ tableName: "recurring_schedule" })
export class RecurringScheduleModel extends Model<RecurringScheduleModel> {
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

  @ForeignKey(() => RecurrenceTypeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recurrence_type_id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  recurrence_end_date: string;

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

  @BelongsTo(() => RecurrenceTypeModel)
  recurrence_type: RecurrenceTypeModel;
}
