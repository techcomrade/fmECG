import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { DeviceModel } from "./device.model";

@Table({ tableName: "device_status" })
export class DeviceStatusModel extends Model<DeviceStatusModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status_description: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => DeviceModel)
  devices: DeviceModel[];
}
