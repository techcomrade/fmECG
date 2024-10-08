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

@Table({ tableName: "diagnosis" })
export class DiagnosisModel extends Model<DiagnosisModel> {
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  doctor_id: string;

  @ForeignKey(() => SchedulesModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  schedule_id: string;

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

  @BelongsTo(() => SchedulesModel)
  schedule: SchedulesModel;
}
