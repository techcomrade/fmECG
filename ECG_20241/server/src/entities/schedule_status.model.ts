import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { SchedulesModel } from './schedules.model';

@Table({ tableName: 'schedule_status' })
export class ScheduleStatusModel extends Model<ScheduleStatusModel> {

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
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @HasMany(() => SchedulesModel)
  schedules: SchedulesModel[];
}
