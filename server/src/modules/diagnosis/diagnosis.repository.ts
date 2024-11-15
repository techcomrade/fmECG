import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DiagnosisModel } from "../../entities/diagnosis.model";
import { DiagnosisRequest } from "./dto/diagnosis.request";
import { DiagnosisResponse } from "./dto/diagnosis.response";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DiagnosisRepository {
  constructor(
    @InjectModel(DiagnosisModel)
    private diagnosisModel: typeof DiagnosisModel
  ) {}

  async createDiagnosis(diagnosis: DiagnosisRequest) {
    return await this.diagnosisModel.create({
      id: diagnosis.id,
      schedule_id: diagnosis.schedule_id,
      information: diagnosis.information,
    });
  }

  async getDiagnosisByScheduleId(
    schedule_id: string
  ): Promise<DiagnosisResponse> {
    return await this.diagnosisModel.findOne({
      where: {
        schedule_id: schedule_id,
      },
    });
  }
}
