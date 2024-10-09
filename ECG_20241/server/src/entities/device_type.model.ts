import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { DeviceModel } from './device.model';

@Table({ tableName: 'device_type' })
export class DeviceTypeModel extends Model<DeviceTypeModel> {

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
  type_name: string;

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
