import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DiagnosisModel } from "../../entities/diagnosis.model";
import { DiagnosisRequest } from "./dto/diagnosis.request";
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
}
