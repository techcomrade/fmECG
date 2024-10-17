import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ScheduleModel } from '../../entities/schedule.model';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class ScheduleRepository {
    constructor(
        @InjectModel(ScheduleModel)
        private scheduleModel: typeof ScheduleModel
    ) { }

    async findAll(): Promise<ScheduleModel[]> {
        return await this.scheduleModel.findAll();
    }

}