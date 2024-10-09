import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { SchedulesModel } from "./schedules.model";
@Table({ tableName: "schedule_type" })
export class ScheduleTypeModel extends Model<ScheduleTypeModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type_name: string;

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

  @HasMany(() => SchedulesModel)
  schedules: SchedulesModel[];
}
