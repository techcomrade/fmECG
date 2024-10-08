import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { SchedulesModel } from "./schedules.model";
import { UserModel } from "./user.model";

@Table({ tableName: "consultation_schedule" })
export class ConsultationScheduleModel extends Model<ConsultationScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => SchedulesModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  schedule_id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctor_id: string;

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

  @BelongsTo(() => SchedulesModel)
  schedule: SchedulesModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
