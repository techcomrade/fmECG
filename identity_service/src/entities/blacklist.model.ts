import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ServiceModel } from './service.model';

@Table({ tableName: 'blacklist' })
export class BlacklistModel extends Model<BlacklistModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => ServiceModel)
  @Column({
    type: DataType.STRING(255),
  })
  service_id: string;
  @BelongsTo(() => ServiceModel)
  service: ServiceModel;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
