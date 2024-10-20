import { AuthenticationGuard } from "../common/guards/authentication.guard";
import { Controller, Get, Post, Body, UseGuards, Query, Res, BadRequestException, HttpStatus, NotFoundException, Delete, Put, InternalServerErrorException } from "@nestjs/common";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from 'express';
import { ApiResponse } from "@nestjs/swagger";

import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleService } from "./schedule.service";
import { ScheduleRequest } from "./dto/schedule.request";
import { plainToInstance } from "class-transformer";
import { UserService } from "../user/user.service";
import { ConsultationScheduleService } from "../consultation_schedule/consultation_schedule.service";

@Controller('schedules')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private consultationScheduleService: ConsultationScheduleService
  ) { }

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)
  @Get("")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful"
  })
  async getAllSchedules(@Res() res: Response) {
    console.log(`[P]:::Get all schedule data`);
    try {
      let schedules = await this.scheduleService.getAllSchedules();
      if (!schedules.length) {
        throw new NotFoundException("No schedule found, please try again");
      }
      let result = plainToInstance(ScheduleResponse, schedules);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all schedules");
    }
  }

  @Get("patient")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful"
  })
  async getScheduleByPatientId(
    @Res() res: Response,
    @Query('patient_id') patient_id: string
  ) {
    console.log(`[P]:::Get schedule by patient id`, patient_id);
    let checkExistPatient = await this.userService.getUserById(patient_id);
    if (checkExistPatient == null) {
      throw new NotFoundException("No patient found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByPatientId(patient_id);
      if (!schedules.length) {
        throw new NotFoundException("No schedule found, please try again");
      }
      let result = plainToInstance(ScheduleResponse, schedules);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get schedule by patient id");
    }
  }

  @Get("doctor")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful"
  })
  async getScheduleByDoctorId(
    @Res() res: Response,
    @Query('doctor_id') doctor_id: string
  ) {
    console.log(`[P]:::Get schedule by doctor_id id`, doctor_id);
    let checkExistDoctor = await this.userService.getUserById(doctor_id);
    if (checkExistDoctor == null) {
      throw new NotFoundException("No doctor found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByDoctorId(doctor_id);
      if (!schedules.length) {
        throw new NotFoundException("No schedule found, please try again");
      }
      let result = plainToInstance(ScheduleResponse, schedules);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get schedule by doctor id");
    }
  }

  @Post("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async createSchedule(@Body() schedule: ScheduleRequest, @Res() res: Response) {
    console.log(`[P]:::Create schedule data`, schedule);
    try {
      await this.scheduleService.createSchedule(schedule);
      return res.json({
        message: "Schedule created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create schedule");
    }
  }

  @Put("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async updateScheduleById(@Body() schedule: ScheduleRequest, @Res() res: Response) {
    console.log(`[P]:::Update schedule by id`, schedule.id);
    let checkExistSchedule = await this.scheduleService.getScheduleById(schedule.id);
    if (checkExistSchedule == null) {
      throw new NotFoundException("No schedule found to update, please try again");
    }
    try {
      await this.scheduleService.updateSchedule(schedule, schedule.id);
      return res.json({
        message: "Schedule updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update schedule");
    }
  }

  @Delete()
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async deleteScheduleById(@Res() res: Response, @Query('id') id: string) {
    console.log(`[P]:::Delete schedule by id`, id);
    let checkExistSchedule = await this.scheduleService.getScheduleById(id);
    if (checkExistSchedule == null) {
      throw new NotFoundException("No schedule found to delete, please try again");
    }
    try {
      await this.scheduleService.deleteScheduleById(id);
      return res.json({
        message: "Schedule has been deleted successfully",
      });
    } catch (error) {
      throw new InternalServerErrorException("Error when delete schedule");
    }
  }


}
