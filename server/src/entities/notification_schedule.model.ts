import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { UserModel } from "./user.model";
import { Col } from "sequelize/types/utils";
import { all } from "axios";

@Table({ tableName: "notifications_schedule" })
export class NotificationScheduleModel extends Model<NotificationScheduleModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

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
    type: DataType.DATE,
  })
  created_at: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  schedule_start_time: bigint;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_seen: boolean;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  type: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
