import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { RecordModel } from "./record.model";

@Table({ tableName: "record_diagnosis" })
export class RecordDiagnosisModel extends Model<RecordDiagnosisModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => RecordModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  record_id: string;

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

  @BelongsTo(() => RecordModel)
  record: RecordModel;
}
