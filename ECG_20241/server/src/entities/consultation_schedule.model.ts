import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ScheduleModel } from "./schedule.model";
import { UserModel } from "./user.model";

@Table({ tableName: "consultation_schedule" })
export class ConsultationScheduleModel extends Model<ConsultationScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => ScheduleModel)
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
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => ScheduleModel)
  schedule: ScheduleModel;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
