import { ConsultationScheduleModel } from "./../../entities/consultation_schedule.model";
const { v4: uuidv4 } = require("uuid");

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
import { UserService } from "../user/user.service";
import { ConsultationScheduleRequest } from "../consultation_schedule/dto/consultation_schedule.request";

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private userService: UserService,
    private consultationScheduleService: ConsultationScheduleService
  ) {}

  async getAllSchedules(): Promise<ScheduleResponse[]> {
    const schedules = await this.scheduleRepository.getAllSchedules();
    const result = [];
    for (const schedule of schedules) {
      const user = await this.userService.getUserById(schedule.patient_id);
      const consultation =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      const doctor = await this.userService.getUserById(consultation.doctor_id);
      result.push({
        ...(<any>schedule).dataValues,
        patient_name: user.username,
        doctor_name: doctor.username,
      });
    }
    return result;
  }

  async createScheduleByDoctor(schedule: ScheduleRequest) {
    schedule.id = uuidv4();
    const user = await this.userService.getUserByAccountId(schedule.account_id);
    if ((<any>schedule.schedule_start_time).length === undefined) {
      await this.scheduleRepository.createSchedule(schedule);
      await this.consultationScheduleService.add(<ConsultationScheduleRequest>{
        id: uuidv4(),
        schedule_id: schedule.id,
        doctor_id: user.id,
      });
    }
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

  async getScheduleByPatientId(
    patient_id: string
  ): Promise<ScheduleResponse[]> {
    return this.scheduleRepository.getScheduleByPatientId(patient_id);
  }

  async getScheduleByDoctorId(doctor_id: string): Promise<ScheduleResponse[]> {
    const consultationSchedules =
      await this.consultationScheduleService.getConsultationScheduleByDoctorId(
        doctor_id
      );
    const scheduleList = [];
    for (const item of consultationSchedules) {
      const id = item.schedule_id;
      const schedule = await this.getScheduleById(id);
      scheduleList.push(schedule);
    }
    return scheduleList;
  }

  async getScheduleByDoctorIdWithTime(
    doctor_id: string,
    startTime: number
  ): Promise<ScheduleResponse[]> {
    const consultationSchedules =
      await this.consultationScheduleService.getConsultationScheduleByDoctorId(
        doctor_id
      );
    const scheduleList = [];
    const TWO_WEEKS_IN_SECONDS = 14 * 24 * 60 * 60;
    for (const item of consultationSchedules) {
      const id = item.schedule_id;
      const schedule = await this.getScheduleById(id);
      if (
        schedule.schedule_start_time >= startTime &&
        schedule.schedule_start_time <= startTime + TWO_WEEKS_IN_SECONDS
      )
        scheduleList.push(schedule);
    }
    return scheduleList;
  }
}
