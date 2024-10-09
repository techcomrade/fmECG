
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModel } from '../../entities/schedule.model';

@Module({
    imports: [
        SequelizeModule.forFeature([ScheduleModel]),
    ],
    controllers: [],
    providers: [ ],
    exports: []
})

export class ScheduleModule { }