import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
import { UserService } from "../user/user.service";
import { ConsultationScheduleRequest } from "../consultation_schedule/dto/consultation_schedule.request";
import { TransactionService } from "../transaction/transaction.service";
import { RevenueService } from "../revenue/revenue.service";
import { RevenueRequest } from "../revenue/dto/revenue.request";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private consultationScheduleService: ConsultationScheduleService,
    private transactionService: TransactionService,
    private revenueService: RevenueService
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

  async countExistingSchedule(schedule: ScheduleRequest): Promise<Number> {
    return await this.scheduleRepository.countExistingSchedule(schedule);
  }

  async checkExistingSchedule(
    schedule: ScheduleRequest
  ): Promise<ScheduleResponse> {
    return await this.scheduleRepository.checkExistingSchedule(schedule);
  }

  async createSchedule(schedule: ScheduleRequest, doctor_id: string) {
    schedule.id = uuidv4();
    return await this.transactionService.transaction(async (t: any) => {
      await this.scheduleRepository.createSchedule(schedule, t);
      await this.consultationScheduleService.add(
        <ConsultationScheduleRequest>{
          id: uuidv4(),
          schedule_id: schedule.id,
          doctor_id: doctor_id,
          schedule_start_time: schedule.schedule_start_time,
        },
        t
      );
    });
  }

  async getAvailableScheduleByDoctorId(scheduleList: ScheduleResponse[]) {
    const availableSchedule = [];
    const today = new Date();

    for (let i = 1; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const hours = [
        8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15,
        15.5, 16, 16.5, 17, 17.5,
      ];
      const formattedDate = date.toISOString().split("T")[0];
      const filterHours = hours.filter((hour) => {
        const hourStart = BigInt(
          new Date(date).setHours(Math.floor(hour), (hour % 1) * 60, 0, 0) /
            1000
        );
        return !scheduleList.some((schedule) => {
          const scheduleStartTimeBigInt = BigInt(schedule.schedule_start_time);
          return hourStart === BigInt(scheduleStartTimeBigInt);
        });
      });
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        availableSchedule.push({
          date: formattedDate,
          hours: filterHours,
        });
      }
    }
    return availableSchedule;
  }

  async getScheduleByStartTime(startTime: number): Promise<ScheduleResponse[]> {
    return await this.scheduleRepository.getScheduleByStartTime(startTime);
  }

  async getScheduleById(id: string): Promise<ScheduleResponse> {
    return await this.scheduleRepository.getScheduleById(id);
  }

  async acceptSchedule(schedule_id: string) {
    const schedule = await this.scheduleRepository.getScheduleById(schedule_id);
    if (schedule.status_id == 1) {
      const revenueData: RevenueRequest = new RevenueRequest();
      revenueData.id = uuidv4();

      const consultation = await this.consultationScheduleService.getConsultationScheduleByScheduleId(
        schedule.id
      );
      revenueData.doctor_id = consultation.doctor_id;
      revenueData.patient_id = schedule.patient_id;
      revenueData.schedule_id = schedule_id;
      revenueData.serviceType = 1;
      revenueData.fee = 200000;
      revenueData.schedule_type = schedule.schedule_type_id;
      await this.revenueService.createRevenue(revenueData);
      return await this.scheduleRepository.scheduleDone(schedule_id);
    } else {
      return await this.scheduleRepository.acceptSchedule(schedule_id);
    }
  }

  async updateSchedule(schedule: ScheduleRequest, id: string) {
    return await this.scheduleRepository.updateScheduleById(schedule, id);
  }

  async updateScheduleResult(schedule_id: string, result: number, t?: any) {
    return await this.scheduleRepository.updateScheduleResultById(
      schedule_id,
      result,
      t
    );
  }

  async deleteScheduleById(id: string) {
    return await this.transactionService.transaction(async (t: any) => {
      await this.consultationScheduleService.deleteConsultationByScheduleId(
        id,
        t
      );
      await this.scheduleRepository.deleteScheduleById(id, t);
    });
  }

  async getScheduleByPatientId(
    patient_id: string
  ): Promise<ScheduleResponse[]> {
    const patient = await this.userService.getUserById(patient_id);
    const schedules = await this.scheduleRepository.getScheduleByPatientId(
      patient_id
    );
    const scheduleList = [];
    for (const schedule of schedules) {
      const consultation =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      const doctor = await this.userService.getUserById(consultation.doctor_id);
      scheduleList.push({
        ...(<any>schedule).dataValues,
        patient_name: patient.username,
        doctor_name: doctor.username,
      });
    }
    return scheduleList;
  }

  async getScheduleByDoctorId(doctor_id: string): Promise<ScheduleResponse[]> {
    const doctor = await this.userService.getUserById(doctor_id);
    const consultationSchedules =
      await this.consultationScheduleService.getConsultationScheduleByDoctorId(
        doctor_id
      );
    const scheduleList = [];
    for (const item of consultationSchedules) {
      const schedule = await this.scheduleRepository.getScheduleById(
        item.schedule_id
      );
      const patient = await this.userService.getUserById(schedule.patient_id);
      scheduleList.push({
        ...(<any>schedule).dataValues,
        patient_name: patient.username,
        doctor_name: doctor.username,
      });
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
