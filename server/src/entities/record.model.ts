import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { UserModel } from "./user.model";
import { DeviceModel } from "./device.model";
import { ScheduleModel } from "./schedule.model";
import { RecordDiagnosisModel } from "./record_diagnosis.model";

@Table({ tableName: "records" })
export class RecordModel extends Model<RecordModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    onDelete: "CASCADE", 
    onUpdate: "SET NULL",
  })
  patient_id: string;

  @ForeignKey(() => DeviceModel)
  @Column({
    type: DataType.STRING,
    onDelete: "CASCADE", 
    onUpdate: "SET NULL",
  })
  device_id: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  start_time: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  end_time: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  data_rec_url: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsTo(() => DeviceModel)
  device: DeviceModel;

  @HasOne(() => RecordDiagnosisModel)
  record_diagnosis: RecordDiagnosisModel;
}
