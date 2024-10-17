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

@Table({ tableName: "diagnosis" })
export class DiagnosisModel extends Model<DiagnosisModel> {
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

  @Column({
    type: DataType.TEXT,
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

  @BelongsTo(() => ScheduleModel)
  schedule: ScheduleModel;
}
