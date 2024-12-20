import { Injectable } from "@nestjs/common";
import { DiagnosisRepository } from "./diagnosis.repository";
import { DiagnosisRequest } from "./dto/diagnosis.request";
import { DiagnosisResponse } from "./dto/diagnosis.response";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DiagnosisService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async createDiagnosis(diagnosis: DiagnosisRequest) {
    diagnosis.id = uuidv4();
    return await this.diagnosisRepository.createDiagnosis(diagnosis);
  }

  async getDiagnosisByScheduleId(
    schedule_id: string
  ): Promise<DiagnosisResponse> {
    return await this.diagnosisRepository.getDiagnosisByScheduleId(schedule_id);
  }

  async updateDiagnosisByScheduleId(
    diagnosis: DiagnosisRequest,
    schedule_id: string
  ) {
    return await this.diagnosisRepository.updateDiagnosisByScheduleId(
      diagnosis,
      schedule_id
    );
  }
}
