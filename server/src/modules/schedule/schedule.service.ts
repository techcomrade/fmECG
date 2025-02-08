const { v4: uuidv4 } = require("uuid");

import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleRequest } from "./dto/schedule.request";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
import { UserService } from "../user/user.service";
import { ConsultationScheduleRequest } from "../consultation_schedule/dto/consultation_schedule.request";
import { TransactionService } from "../transaction/transaction.service";
import { CronJob } from "cron";
import { NotificationService } from "../notification/notification.service";
import { NotificationRequest } from "../notification/dto/notification.request";
import { UserResponse } from "../user/dto/user.response";

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private consultationScheduleService: ConsultationScheduleService,
    private transactionService: TransactionService,
    private notificationService: NotificationService
  ) {
    this.autoCancelPendingSchedule();
    this.autoSendScheduleReminder();
    this.autoCheckScheduleResult();
    this.autoWarnScheduleResult();
    this.autoCancelWarningSchedule();
  }

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
    const localTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

    for (let i = 2; i <= 15; i++) {
      const date = new Date(localTime);
      date.setDate(localTime.getDate() + i);
      date.setUTCHours(0, 0, 0, 0);
      const hours = [
        9, 9.5, 10, 10.5, 11, 11.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18,
        18.5, 19, 19.5, 20, 20.5,
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
    return await this.scheduleRepository.acceptSchedule(schedule_id);
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
    patient_id: string,
    patient?: UserResponse
  ): Promise<ScheduleResponse[]> {
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
        patient_name: patient?.username,
        doctor_name: doctor.username,
      });
    }
    return scheduleList;
  }

  async getScheduleByDoctorId(
    doctor_id: string,
    doctor?: UserResponse
  ): Promise<ScheduleResponse[]> {
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
        doctor_name: doctor?.username,
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
        schedule.schedule_start_time < startTime + TWO_WEEKS_IN_SECONDS
      )
        scheduleList.push(schedule);
    }
    return scheduleList;
  }

  async cancelPendingSchedule() {
    const pendingSchedules = await this.scheduleRepository.getPendingSchedule();
    const ALLOW_TIME = 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    for (const schedule of pendingSchedules) {
      const consultation =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      if (schedule.createdAt.getTime() + ALLOW_TIME <= currentTime) {
        await Promise.all([
          this.notificationService.add({
            doctor_id: consultation.doctor_id,
            patient_id: schedule.patient_id,
            schedule_start_time: schedule.schedule_start_time,
            is_seen: false,
            type: 0,
            status: 5,
          } as NotificationRequest),
          this.deleteScheduleById(schedule.id),
        ]);
      }
    }
  }

  private async autoCancelPendingSchedule() {
    const job = CronJob.from({
      cronTime: "0 */1 * * *",
      onTick: async () => {
        console.log(
          `Running auto check pending schedule at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`
        );
        await this.cancelPendingSchedule();
      },
      start: true,
    });
  }

  async sendScheduleReminder() {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const acceptedSchedules =
      await this.scheduleRepository.getAcceptedSchedule();
    for (const schedule of acceptedSchedules) {
      const reminderTime = Number(schedule.schedule_start_time) - currentTime;
      if (reminderTime === 3600 || reminderTime === 900) {
        const consultation =
          await this.consultationScheduleService.getConsultationScheduleByScheduleId(
            schedule.id
          );
        await this.notificationService.add({
          doctor_id: consultation.doctor_id,
          patient_id: schedule.patient_id,
          schedule_start_time: schedule.schedule_start_time,
          is_seen: false,
          type: reminderTime === 3600 ? 0 : 1,
          status: 0,
        } as NotificationRequest);
      }
    }
  }

  private async autoSendScheduleReminder() {
    const job = CronJob.from({
      cronTime: "0,15,30,45 8-21 * * *",
      onTick: async () => {
        console.log(
          `Running auto send schedule reminder at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`
        );
        await this.sendScheduleReminder();
      },
      start: true,
    });
  }

  async checkScheduleResult() {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const acceptedSchedules =
      await this.scheduleRepository.getAcceptedSchedule();
    for (const schedule of acceptedSchedules) {
      if (
        Number(schedule.schedule_end_time) === currentTime &&
        schedule.schedule_result === 4
      ) {
        await this.updateScheduleResult(schedule.id, 0);
      }
      if (Number(schedule.schedule_start_time) === currentTime) {
        await this.updateScheduleResult(schedule.id, 4);
      }
    }
  }

  private async autoCheckScheduleResult() {
    const job = CronJob.from({
      cronTime: "0,30 8-21 * * *",
      onTick: async () => {
        console.log(
          `Running auto check schedule result at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`
        );
        await this.checkScheduleResult();
      },
      start: true,
    });
  }

  async warnScheduleResult() {
    let schedules = await this.scheduleRepository.getPendingResultSchedule();
    for (const schedule of schedules) {
      await this.updateScheduleResult(schedule.id, 5);
      const consultation =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      await this.notificationService.add({
        doctor_id: consultation.doctor_id,
        patient_id: schedule.patient_id,
        schedule_start_time: schedule.schedule_start_time,
        is_seen: false,
        type: 1,
        status: 6,
      } as NotificationRequest);
    }
  }

  private async autoWarnScheduleResult() {
    const job = CronJob.from({
      cronTime: "00 10 * * *",
      onTick: async () => {
        console.log(
          `Running auto warn schedule result at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`
        );
        await this.warnScheduleResult();
      },
      start: true,
    });
  }

  async cancelWarningSchedule() {
    let schedules = await this.scheduleRepository.getWarningResultSchedule();
    for (const schedule of schedules) {
      await this.updateScheduleResult(schedule.id, 3);
    }
  }

  private async autoCancelWarningSchedule() {
    const job = CronJob.from({
      cronTime: "30 9 * * *",
      onTick: async () => {
        console.log(
          `Running auto cancel warning schedule at ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`
        );
        await this.cancelWarningSchedule();
      },
      start: true,
    });
  }
}
