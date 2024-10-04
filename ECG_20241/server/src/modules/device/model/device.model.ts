import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "devices" })
export class DeviceModel extends Model<DeviceModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
  })
  user_id: string;

  @Column({
    type: DataType.STRING(255),
  })
  doctor_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  device_name: string;

  @Column({
    type: DataType.TEXT,
  })
  information: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  device_type: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  start_date: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.BIGINT
  })
  createdAt: number;

  @Column({
    type: DataType.BIGINT
  })
  updatedAt: number;
}
