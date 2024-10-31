import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ScheduleModel } from "../../entities/schedule.model";
import { DiagnosisModel } from "../../entities/diagnosis.model";
import { DiagnosisRepository } from "./diagnosis.repository";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisController } from "./diagnosis.controller";

@Module({
  imports: [SequelizeModule.forFeature([DiagnosisModel, ScheduleModel])],
  providers: [DiagnosisRepository, DiagnosisService],
  controllers: [DiagnosisController],
  exports: [DiagnosisService],
})
export class DiagnosisModule {}
