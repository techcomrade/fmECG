import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'device_status' })
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
    allowNull: true,
  })
  createdAt: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: number;
}
