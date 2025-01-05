import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ScheduleModel } from "./schedule.model";
import { ScheduleTypeModel } from "./schedule_type.model";
import { UserModel } from "./user.model";

@Table({ tableName: "revenue_statistics" })
export class RevenueModel extends Model<RevenueModel> {
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

  @ForeignKey(() => ScheduleTypeModel)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  schedule_type: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING(255),
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  patient_id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING(255),
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  doctor_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  serviceType: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  fee: number;

   @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
    })
   discount: number;

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

  @BelongsTo(() => UserModel, { foreignKey: "patient_id", as: "patient" })
  patient: UserModel;

  @BelongsTo(() => UserModel, { foreignKey: "doctor_id", as: "doctor" })
  doctor: UserModel;

    @BelongsTo(() => ScheduleTypeModel)
    scheduleType: ScheduleTypeModel;
}