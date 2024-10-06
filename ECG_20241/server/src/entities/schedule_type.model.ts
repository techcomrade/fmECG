import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'schedule_type' })
export class ScheduleTypeModel extends Model<ScheduleTypeModel> {

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
