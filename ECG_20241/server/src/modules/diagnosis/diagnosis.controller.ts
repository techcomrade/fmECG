import {
  Controller,
  Post,
  Body,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "@nestjs/swagger";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisRequest } from "./dto/diagnosis.request";

@Controller("diagnosis")
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successful",
  })
  async createDiagnosis(
    @Body() diagnosis: DiagnosisRequest,
    @Res() res: Response
  ) {
    console.log(`[P]:::Create diagnosis data`, diagnosis);
    try {
      await this.diagnosisService.createDiagnosis(diagnosis);
      return res.json({
        message: "Diagnosis created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create diagnosis");
    }
  }
}
