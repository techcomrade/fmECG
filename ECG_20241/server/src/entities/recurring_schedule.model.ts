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
import { RecurrenceTypeModel } from "./recurrence_type.model"

@Table({ tableName: "recurring_schedule" })
export class RecurringScheduleModel extends Model<RecurringScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => ScheduleModel)
  @Column({
    type: DataType.STRING(255),
    onDelete: "CASCADE", 
    onUpdate: "SET NULL",
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

  @BelongsTo(() => ScheduleModel)
  schedule: ScheduleModel;

  @BelongsTo(() => RecurrenceTypeModel)
  recurrence_type: RecurrenceTypeModel;
}
