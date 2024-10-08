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
import { UserModel } from "./user.model";

@Table({ tableName: "record" })
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
    allowNull: false,
  })
  use_id: string;

  @ForeignKey(() => DeviceModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  device_id: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  startTime: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  endTime: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  data_rec_url: string;

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

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BelongsTo(() => DeviceModel)
  device: DeviceModel;
}
