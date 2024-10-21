import { ConsultationScheduleResponse } from './dto/consultation_schedule.response';
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ConsultationScheduleModel } from "../../entities/consultation_schedule.model";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class ConsultationScheduleRepository {
  constructor(
    @InjectModel(ConsultationScheduleModel)
    private consultationScheduleModel: typeof ConsultationScheduleModel
  ) { }

  async getAllConsultationSchedule(): Promise<ConsultationScheduleResponse[]> {
    return await this.consultationScheduleModel.findAll();
  }

  async getConsultationScheduleByDoctorId(doctor_id: string): Promise<ConsultationScheduleResponse[]> {
    return await this.consultationScheduleModel.findAll({ 
        where: { doctor_id: doctor_id } 
    });
  }
}
