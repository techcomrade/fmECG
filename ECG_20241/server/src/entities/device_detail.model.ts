import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { DeviceModel } from "./device.model";

@Table({ tableName: "device_details" })
export class DeviceDetailModel extends Model<DeviceDetailModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => DeviceModel)
  @Column({
    type: DataType.STRING,
    onDelete: "CASCADE",
    onUpdate: "SET NULL",
  })
  device_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  detail_name: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  detail_type: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.STRING,
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

  @BelongsTo(() => DeviceModel)
  device: DeviceModel;
}
