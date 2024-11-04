import { UserRequest } from "./dto/user.request";
import { UserResponse } from "./dto/user.response";
import { UserRepository } from "./user.repository";
const { v4: uuidv4 } = require("uuid");

import { Injectable } from "@nestjs/common";
import { ScheduleResponse } from "../schedule/dto/schedule.response";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private consultationScheduleService: ConsultationScheduleService
  ) {}

  async getAllUsers(): Promise<UserResponse[]> {
    return this.userRepository.getAllUsers();
  }

  async getAllDoctors(): Promise<UserResponse[]> {
    return await this.userRepository.getAllDoctors();
  }

  async add(user: UserRequest) {
    user.id = uuidv4();
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
