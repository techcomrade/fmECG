import { Injectable } from "@nestjs/common";
import { DiagnosisRepository } from "./diagnosis.repository";
import { DiagnosisRequest } from "./dto/diagnosis.request";
import { DiagnosisResponse } from "./dto/diagnosis.response";
import { ScheduleService } from "../schedule/schedule.service";
import { TransactionService } from "../transaction/transaction.service";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DiagnosisService {
  constructor(
    private diagnosisRepository: DiagnosisRepository,
    private scheduleService: ScheduleService,
    private transactionService: TransactionService
  ) {}

  async createDiagnosis(diagnosis: DiagnosisRequest, t?: any) {
    diagnosis.id = uuidv4();
    return await this.transactionService.transaction(async (t: any) => {
      await this.diagnosisRepository.createDiagnosis(diagnosis, t);
      await this.scheduleService.updateScheduleResult(
        diagnosis.schedule_id,
        1,
        t
      );
    });
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
