import { AuthenticationGuard } from "../common/guards/authentication.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Res,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Delete,
  Put,
  InternalServerErrorException,
} from "@nestjs/common";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from "express";
import { ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ConsultationScheduleResponse } from "./dto/consultation_schedule.response";
import { ConsultationScheduleService } from "./consultation_schedule.service";
import { ConsultationScheduleRequest } from "./dto/consultation_schedule.request";
import { ScheduleRequest } from "../schedule/dto/schedule.request";
const { v4: uuidv4 } = require("uuid");

@Controller("consultations")
export class ConsultationSchedulesController {
  constructor(
    private consultationScheduleService: ConsultationScheduleService
) { }

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)

  @Get("consultation")
  @ApiResponse({
    status: 200,
    type: [ConsultationScheduleResponse],
    description: "Successful"
  })
  async getConsultationScheduleByDoctorId(
    @Res() res: Response, 
    @Query('doctor_id') doctor_id: string){
    console.log(`[P]:::Get all consultation schedules by doctor_id: `, doctor_id);
    try {
      let consultations = await this.consultationScheduleService.getConsultationScheduleByDoctorId(doctor_id);
      if (!consultations.length) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(ConsultationScheduleResponse, consultations);
      return res.json(result);
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all users");
    }
  }

  // @Post("")
  // @ApiResponse({
  //   status: 201,
  //   type: Boolean,
  //   description: "Successful",
  // })
  // async createConsultation(@Body() schedule: ScheduleRequest, @Res() res: Response) {
  //   const consultation = {
  //     id: uuidv4(),
  //     schedule_id: uuidv4(),
      
  //   }
  //   console.log(`[P]:::Add consultation data`, consultation);
  //   try {
  //     await this.consultationScheduleService.add(consultation);
  //     return res.json({
  //       message: "Consultation created successfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new BadRequestException("Failed to create consultation");
  //   }
  // }
}
