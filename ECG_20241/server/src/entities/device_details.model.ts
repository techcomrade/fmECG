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
export class DeviceDetailsModel extends Model<DeviceDetailsModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => DeviceModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  device_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  detail_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  information: string;

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

  @BelongsTo(() => DeviceModel)
  device: DeviceModel;
}
