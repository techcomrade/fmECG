import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DiagnosisModel } from "../../entities/diagnosis.model";
import { DiagnosisRequest } from "./dto/diagnosis.request";
import { DiagnosisResponse } from "./dto/diagnosis.response";

@Injectable()
export class DiagnosisRepository {
  constructor(
    @InjectModel(DiagnosisModel)
    private diagnosisModel: typeof DiagnosisModel
  ) {}

  async createDiagnosis(diagnosis: DiagnosisRequest, t?: any) {
    return await this.diagnosisModel.create(
      {
        id: diagnosis.id,
        schedule_id: diagnosis.schedule_id,
        information: diagnosis.information,
      },
      t && {
        transaction: t,
      }
    );
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

  async updateDiagnosisByScheduleId(
    diagnosis: DiagnosisRequest,
    schedule_id: string
  ) {
    return await this.diagnosisModel.update(
      {
        information: diagnosis.information,
      },
      {
        where: {
          schedule_id: schedule_id,
        },
      }
    );
  }
}
