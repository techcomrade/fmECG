import { Column, Model, Table, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { UserModel } from '../../user/model/user.model';

@Table({ tableName: 'tokens' })
export class TokenModel extends Model<TokenModel> {

  @PrimaryKey
  @Column({
    type: DataType.STRING(255), 
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING(255), 
    allowNull: false, 
  })
  access_token: string;

  @Column({
    type: DataType.STRING(255), 
    allowNull: false, 
  })
  refresh_token: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false 
  })
  expires_at: number
}
