import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "./user.model";
import { DiagnosisModel } from "./diagnosis.model";
import { RecordModel } from "./record.model";
import { ScheduleTypeModel } from "./schedule_type.model";
import { ScheduleStatusModel } from "./schedule_status.model";
import { ConsultationScheduleModel } from "./consultation_schedule.model";

@Table({ tableName: "schedules" })
export class ScheduleModel extends Model<ScheduleModel> {
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

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  schedule_start_time: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  schedule_end_time: bigint;

  @ForeignKey(() => ScheduleTypeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  schedule_type_id: number;

  @ForeignKey(() => ScheduleStatusModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  schedule_result: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => UserModel)
  patient: UserModel;

  @BelongsTo(() => ScheduleTypeModel)
  schedule_type: ScheduleTypeModel;

  @BelongsTo(() => ScheduleStatusModel)
  schedule_status: ScheduleStatusModel;

  @HasMany(() => DiagnosisModel)
  diagnosis: DiagnosisModel[];

  @HasMany(() => ConsultationScheduleModel)
  consultation_schedules: ConsultationScheduleModel[];
}
