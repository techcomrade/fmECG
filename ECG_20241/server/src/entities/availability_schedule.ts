import {
    Column,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
} from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table({ tableName: "availability_schedule" })
export class AvailabilityScheduleModel extends Model<AvailabilityScheduleModel> {
    @PrimaryKey
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.STRING(255),
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
    })
    user_id: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    available_time: bigint;

    @Column({
        type: DataType.DATE,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
    })
    updatedAt: Date;

    @BelongsTo(() => UserModel)
    user: UserModel;
}
