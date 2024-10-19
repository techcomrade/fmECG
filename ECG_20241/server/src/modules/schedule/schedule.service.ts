const { v4: uuidv4 } = require("uuid");

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleModel } from "../../entities/schedule.model";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository
  ) { }


  async getAllSchedules(): Promise<ScheduleResponse[]> {
    return this.scheduleRepository.getAllSchedules();
  }

  async createSchedule(schedule: ScheduleRequest): Promise<ScheduleResponse> {
    schedule.id = uuidv4();
    return await this.scheduleRepository.createSchedule(schedule);
  }

  async getScheduleById(id: string): Promise<ScheduleResponse> {
    return this.scheduleRepository.getScheduleById(id);
  }

  async updateSchedule(schedule: ScheduleRequest, id: string) {
    return this.scheduleRepository.updateScheduleById(schedule, id);
  }

  async deleteScheduleById(id: string) {
    return this.scheduleRepository.deleteScheduleById(id);
  }

  async getScheduleByPatientId(patient_id: string): Promise<ScheduleResponse[]> {
    return this.scheduleRepository.getScheduleByPatientId(patient_id);
  }
}
