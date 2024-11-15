import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  BadRequestException,
  NotFoundException,
  Delete,
  Put,
  InternalServerErrorException,
  Param,
  Req,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "@nestjs/swagger";
import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleService } from "./schedule.service";
import { ScheduleRequest } from "./dto/schedule.request";
import { plainToInstance } from "class-transformer";
import { UserService } from "../user/user.service";
import { UserResponse } from "../user/dto/user.response";
import { UserGuardModel } from "../authentication/dto/user.guard.model";

@Controller("schedules")
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService
  ) {}

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)
  @Get("")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful",
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

  @Get("patient-id")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful",
  })
  async getScheduleByPatientId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response,
  ) {
    const patientId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get schedule by patient id`, patientId);
    let checkExistPatient = await this.userService.getUserById(patientId);
    if (checkExistPatient == null) {
      throw new NotFoundException("No patient found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByPatientId(
        patientId
      );
      if (!schedules.length) {
        throw new NotFoundException("No schedule found, please try again");
      }
      let result = plainToInstance(ScheduleResponse, schedules);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get schedule by patient id"
      );
    }
  }

  @Get("doctor-id")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful",
  })
  async getScheduleByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response,
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get schedule by doctor_id id`, doctorId);
    let checkExistDoctor = await this.userService.getUserById(doctorId);
    if (checkExistDoctor == null) {
      throw new NotFoundException("No doctor found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByDoctorId(
        doctorId
      );
      if (!schedules.length) {
        throw new NotFoundException("No schedule found, please try again");
      }
      let result = plainToInstance(ScheduleResponse, schedules);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get schedule by doctor id"
      );
    }
  }

  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successful",
  })
  async createScheduleByDoctor(
    @Req() req: Request & { user?: UserGuardModel },
    @Body() schedule: ScheduleRequest,
    @Res() res: Response
  ) {
    console.log(`[P]:::Create schedule data`, schedule);
    try {
      const doctor = await this.userService.getUserByAccountId(
        req.user.accountId
      );
      await this.scheduleService.createSchedule(schedule, doctor.id);
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
  async updateScheduleById(
    @Body() schedule: ScheduleRequest,
    @Res() res: Response
  ) {
    console.log(`[P]:::Update schedule by id`, schedule.id);
    let checkExistSchedule = await this.scheduleService.getScheduleById(
      schedule.id
    );
    if (checkExistSchedule == null) {
      throw new NotFoundException(
        "No schedule found to update, please try again"
      );
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
  async deleteScheduleById(@Res() res: Response, @Param("id") id: string) {
    console.log(`[P]:::Delete schedule by id`, id);
    let checkExistSchedule = await this.scheduleService.getScheduleById(id);
    if (checkExistSchedule == null) {
      22;
      throw new NotFoundException(
        "No schedule found to delete, please try again"
      );
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

  @Get("/available-schedule/:id")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "Successfully",
  })
  async getAvailableScheduleByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response,
    @Param("id") id: string
  ) {
    console.log(`[P]::: Get available schedules of doctor by doctor id`, id);
    const timestamp = Math.floor(new Date().getTime() / 1000);

    try {
      let doctorId: string;
      if (id === "doctor") {
        doctorId = (
          await this.userService.getUserByAccountId(req.user.accountId)
        ).id;
      } else doctorId = id;

      const scheduleList =
        await this.scheduleService.getScheduleByDoctorIdWithTime(
          doctorId,
          timestamp
        );
      const availableSchedule =
        await this.scheduleService.getAvailableScheduleByDoctorId(scheduleList);

      return res.json(availableSchedule);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        "Error when getting available schedules of doctor"
      );
    }
  }

  @Post("/create/doctor")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successfully",
  })
  async createScheduleWithSelectedDoctor(
    @Req() req: Request & { user?: UserGuardModel },
    @Body() schedule: ScheduleRequest,
    @Res() res: Response
  ) {
    const { doctor_id } = schedule;
    const patient = await this.userService.getUserByAccountId(
      req.user.accountId
    );
    console.log(
      `[P]:::Create schedule with selected doctor`,
      schedule,
      doctor_id
    );
    try {
      const doctor = await this.userService.getUserById(doctor_id);
      if (!doctor)
        return res.json({
          message: "Doctor not found",
        });
      schedule.status_id = 2;
      schedule.patient_id = patient.id;
      await this.scheduleService.createSchedule(schedule, doctor_id);
      return res.json({
        message: "Schedule created successfully",
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        "Error when create schedule by doctor with time"
      );
    }
  }

  @Post("get/schedule")
  @ApiResponse({
    status: 200,
    type: ScheduleResponse,
    description: "Successfully",
  })
  async createScheduleByScheduleTime(
    @Body() schedule: any,
    @Res() res: Response
  ) {
    console.log(`[P]:::Create schedule by schedule time`, schedule);
    try {
      const scheduleList = await this.scheduleService.getScheduleByStartTime(
        schedule?.startTime
      );
      const doctorArray = await this.userService.getDoctorAvailableWithSchedule(
        scheduleList
      );
      let result = plainToInstance(UserResponse, doctorArray);
      return res.json({
        result,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        "Error when create schedule by doctor with time"
      );
    }
  }
}
