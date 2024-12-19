import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ScheduleModel } from "../../entities/schedule.model";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(ScheduleModel)
    private scheduleModel: typeof ScheduleModel
  ) {}

  async getAllSchedules(): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll();
  }

  async createSchedule(schedule: ScheduleRequest, t?: any) {
    return await this.scheduleModel.create(
      {
        id: schedule.id,
        patient_id: schedule.patient_id,
        schedule_start_time: schedule.schedule_start_time,
        schedule_end_time: schedule.schedule_end_time,
        schedule_type_id: schedule.schedule_type_id,
        status_id: schedule.status_id ?? 1,
      },
      t && {
        transaction: t,
      }
    );
  }

  async countExistingSchedule(schedule: ScheduleRequest): Promise<Number> {
    return await this.scheduleModel.count({
      where: { patient_id: schedule.patient_id, status_id: 2 },
    });
  }

  async checkExistingSchedule(
    schedule: ScheduleRequest
  ): Promise<ScheduleResponse> {
    return await this.scheduleModel.findOne({
      where: {
        patient_id: schedule.patient_id,
        schedule_start_time: schedule.schedule_start_time,
      },
    });
  }

  async getScheduleById(id: string): Promise<ScheduleResponse> {
    return await this.scheduleModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async getScheduleByStartTime(startTime: number): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        schedule_start_time: startTime,
      },
    });
  }

  async acceptSchedule(id: string) {
    return await this.scheduleModel.update(
      {
        status_id: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async updateScheduleById(schedule: ScheduleRequest, id: string) {
    return await this.scheduleModel.update(
      {
        id: schedule.id,
        patient_id: schedule.patient_id,
        schedule_start_time: schedule.schedule_start_time,
        schedule_end_time: schedule.schedule_end_time,
        schedule_type_id: schedule.schedule_type_id,
        status_id: schedule.status_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async deleteScheduleById(id: string, t?: any) {
    return await this.scheduleModel.destroy({
      where: {
        id: id,
      },
      transaction: t,
    });
  }

  async getScheduleByPatientId(
    patient_id: string
  ): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        patient_id: patient_id,
      },
    });
  }
}
