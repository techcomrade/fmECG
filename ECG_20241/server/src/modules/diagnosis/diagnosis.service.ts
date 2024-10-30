import { Injectable } from "@nestjs/common";
import { DiagnosisRepository } from "./diagnosis.repository";
import { DiagnosisRequest } from "./dto/diagnosis.request";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DiagnosisService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}
  async createDiagnosis(diagnosis: DiagnosisRequest) {
    diagnosis.id = uuidv4();
    return await this.diagnosisRepository.createDiagnosis(diagnosis);
  }
}
