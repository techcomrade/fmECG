import {
  Controller,
  Post,
  Body,
  Res,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "@nestjs/swagger";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisRequest } from "./dto/diagnosis.request";
import { DiagnosisResponse } from "./dto/diagnosis.response";
import { plainToInstance } from "class-transformer";
import { AuthorizationGuard } from "../authentication/authorization.guard";
import { Roles } from "../authentication/decorators/role.decorator";
import { Role } from "../authentication/dto/role.enum";
@UseGuards(AuthorizationGuard)
@Controller("diagnosis")
export class DiagnosisController {
  constructor(private diagnosisService: DiagnosisService) {}

  @Roles(Role.Admin, Role.Doctor)
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
    console.log("[P]:::Create diagnosis data", diagnosis);
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

  @Roles(Role.Admin, Role.Doctor)
  @Get("schedule/:schedule_id")
  @ApiResponse({
    status: 200,
    type: DiagnosisResponse,
    description: "successful",
  })
  async getDiagnosisByScheduleId(
    @Res() res: Response,
    @Param("schedule_id") schedule_id: string
  ) {
    console.log("[P]:::Get diagnosis by schedule id", schedule_id);
    try {
      let diagnosis = await this.diagnosisService.getDiagnosisByScheduleId(
        schedule_id
      );
      if (!diagnosis) {
        throw new NotFoundException("No diagnosis found, please try again");
      }
      let result = plainToInstance(DiagnosisResponse, diagnosis);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get diagnosis by schedule id"
      );
    }
  }
}