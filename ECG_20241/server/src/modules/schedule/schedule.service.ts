import { ConsultationScheduleModel } from './../../entities/consultation_schedule.model';
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
import { ConsultationScheduleService } from '../consultation_schedule/consultation_schedule.service';
import { console } from 'inspector';

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private consultationScheduleService: ConsultationScheduleService,
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

  async getScheduleByDoctorId(doctor_id: string): Promise<ScheduleResponse[]> {
    const consultationSchedules = await this.consultationScheduleService.getConsultationScheduleByDoctorId(doctor_id);
    const scheduleList = [];
    for (const item of consultationSchedules){
      const id = item.schedule_id;
      const schedule = await this.getScheduleById(id);
      scheduleList.push(schedule);
    }
    return scheduleList;
  }
}
