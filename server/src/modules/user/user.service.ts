import { UserRequest } from "./dto/user.request";
import { UserResponse } from "./dto/user.response";
import { UserRepository } from "./user.repository";
const { v4: uuidv4 } = require("uuid");

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ScheduleResponse } from "../schedule/dto/schedule.response";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
import { ScheduleService } from "../schedule/schedule.service";
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private consultationScheduleService: ConsultationScheduleService,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService
  ) {}

  async getAllUsers(): Promise<UserResponse[]> {
    return this.userRepository.getAllUsers();
  }

  async getAllDoctors(): Promise<UserResponse[]> {
    return await this.userRepository.getAllDoctors();
  }

  async add(user: UserRequest) {
    return await this.userRepository.add(user);
  }

  async getUserByUserName(username: string): Promise<UserResponse[]> {
    return await this.userRepository.getUserByUserName(username);
  }

  async getUserById(id: string): Promise<UserResponse> {
    return await this.userRepository.getUserById(id);
  }

  async getUserByAccountId(account_id: string): Promise<UserResponse> {
    return await this.userRepository.getUserByAccountId(account_id);
  }

  async getPatientByDoctorId(doctor_id: string): Promise<UserResponse[]> {
    const result = [];
    const schedules = await this.scheduleService.getScheduleByDoctorId(
      doctor_id
    );
    for (const schedule of schedules) {
      const patient = await this.userRepository.getUserById(
        schedule.patient_id
      );
      result.push((<any>patient).dataValues);
    }
    return result;
  }

  async getDoctorByPatientId(patient_id: string): Promise<UserResponse[]> {
    const result = [];
    const schedules = await this.scheduleService.getScheduleByPatientId(
      patient_id
    );
    for (const schedule of schedules) {
      const consultationSchedule =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      const doctor = await this.userRepository.getUserById(
        consultationSchedule.doctor_id
      );
      result.push((<any>doctor).dataValues);
    }
    return result;
  }

  async updateUserById(user: UserRequest, id: string) {
    return await this.userRepository.updateUserById(user, id);
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteUserById(id);
  }

  async getDoctorAvailableWithSchedule(
    scheduleList: ScheduleResponse[]
  ): Promise<UserResponse[]> {
    const doctorArray = await this.getAllDoctors();

    const doctorAvailability: { [key: string]: boolean } = {};
    for (const doctor of doctorArray) {
      doctorAvailability[doctor.id] = true;
    }

    for (const schedule of scheduleList) {
      const consultationSchedule =
        await this.consultationScheduleService.getConsultationScheduleByScheduleId(
          schedule.id
        );
      if (consultationSchedule?.doctor_id)
        doctorAvailability[consultationSchedule?.doctor_id] = false;
    }

    const doctorAvailableArray = doctorArray.filter(
      (doctor) => doctorAvailability[doctor.id]
    );
    return doctorAvailableArray;
  }
}
