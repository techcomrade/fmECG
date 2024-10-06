import { Column, Model, Table, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { DeviceTypeModel } from './device_type.model'; 
import { DeviceStatusModel } from './device_status.model';

@Table({ tableName: 'devices' })
export class DeviceModel extends Model<DeviceModel> {

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
  doctor_id: string;

  @BelongsTo(() => UserModel)
  doctor: UserModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  device_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  information: string;

  @ForeignKey(() => DeviceTypeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  device_type_id: number;

  @BelongsTo(() => DeviceTypeModel)
  device_type: DeviceTypeModel;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  start_date: number;

  @ForeignKey(() => DeviceStatusModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;

  @BelongsTo(() => DeviceStatusModel)
  status: DeviceStatusModel;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: number;
}
