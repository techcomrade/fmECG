import { UserRequest } from "./dto/user.request";
import { UserResponse } from "./dto/user.response";
import { UserRepository } from "./user.repository";
const { v4: uuidv4 } = require("uuid");

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ScheduleResponse } from "../schedule/dto/schedule.response";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";
import { ScheduleService } from "../schedule/schedule.service";
import { LoginRequestModel } from "./dto/login.request";
import { LoginResponseModel } from "./dto/login.response";
import { AccountRegisterModel } from "./dto/register.request";
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

  async countUsersPerMonth(): Promise<any> {
    return await this.userRepository.countUsersPerMonth();
  }

  async add(user: UserRequest) {
    user.account_id = uuidv4();
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
    const result: UserResponse[] = [];
    const schedules = await this.scheduleService.getScheduleByDoctorId(
      doctor_id
    );
    for (const schedule of schedules) {
      const patient = await this.userRepository.getUserById(
        schedule.patient_id
      );
      const patientData = (<any>patient).dataValues;

      if (!result.some((item) => item.id === patientData.id)) {
        result.push(patientData);
      }
    }
    return result;
  }

  async getDoctorByPatientId(patient_id: string): Promise<UserResponse[]> {
    const result: UserResponse[] = [];
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
      const doctorData = (<any>doctor).dataValues;

      if (!result.some((item) => item.id === doctorData.id)) {
        result.push(doctorData);
      }
    }
    return result;
  }

  async updateUserById(user: UserRequest, id: string) {
    return await this.userRepository.updateUserById(user, id);
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteUserById(id);
  }

  async getAvailableDoctorByScheduleTime(
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

  async login(LoginInfo: LoginRequestModel): Promise<LoginResponseModel> {
    const user = await this.userRepository.getUserByEmail(LoginInfo.email);
    if (!user) {
      throw new NotFoundException("No user found, please try again");
    }
    console.log(LoginInfo);
    if (user.password != LoginInfo.password) {
      throw new BadRequestException("Wrong password");
    }
    // 60 minute expired
    const expiredTime = 60 * 60 * 1000;
    const expiredAt = Date.now() + expiredTime;
    const result: LoginResponseModel = {
      access_token: `kjsdhfueinmxvnjksdfhldksjfmdfbk$${user.account_id}$jxcvjdksfdjfkbdkfjdbsjfkbdsfjk$${expiredAt}$bdsjfbskdfjbskfbsmncvcvmxmbv$${user.role_id}$`,
      role: user.role_id,
      expired_time: expiredAt,
    };
    return result;
  };
  async register(registerInfo: AccountRegisterModel): Promise<Boolean>{
    return true;
  };
}
