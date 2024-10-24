import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { RecurringScheduleModel } from "./recurring_schedule.model";

@Table({ tableName: "recurrence_type" })
export class RecurrenceTypeModel extends Model<RecurrenceTypeModel> {
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
  type_name: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => RecurringScheduleModel)
  recurring_schedules: RecurringScheduleModel[];
}
