import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

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
    type: DataType.BIGINT,
    allowNull: true,
  })
  createdAt: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  updatedAt: number;
}
