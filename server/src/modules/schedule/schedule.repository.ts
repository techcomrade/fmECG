import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ScheduleModel } from "../../entities/schedule.model";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";
import { Op } from "sequelize";

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
        status_id: schedule.status_id ?? 1,
        schedule_result: schedule.schedule_result ?? 2,
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
        status_id: { [Op.in]: [1, 2] },
      },
    });
  }

  async checkScheduleByPatientIdAndTime(
    schedule: ScheduleRequest
  ): Promise<ScheduleResponse> {
    return await this.scheduleModel.findOne({
      where: {
        patient_id: schedule.patient_id,
        schedule_start_time: schedule.schedule_start_time,
      },
    });
  }

  async getPendingResultSchedule(): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        schedule_result: 0,
      },
      lock: true,
    });
  }

  async getWarningResultSchedule(): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        schedule_result: 5,
      },
      lock: true,
    });
  }

  async getAcceptedSchedule(): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        status_id: 1,
      },
    });
  }

  async getPendingSchedule(): Promise<ScheduleResponse[]> {
    return await this.scheduleModel.findAll({
      where: {
        status_id: 2,
      },
      lock: true,
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
        status_id: { [Op.in]: [1, 2] },
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

  async rejectSchedule(id: string) {
    return await this.scheduleModel.update(
      {
        status_id: 3,
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
        status_id: schedule.status_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async updateScheduleResultById(id: string, result: number, t?: any) {
    return await this.scheduleModel.update(
      {
        schedule_result: result,
      },
      {
        where: {
          id: id,
        },
        transaction: t,
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
        status_id: { [Op.in]: [1, 2] },
      },
    });
  }
}
