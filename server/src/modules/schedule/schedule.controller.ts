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
import { AcceptScheduleRequest } from "./dto/acceptSchedule.request";
import { UpdateResultRequest } from "./dto/updateResult.request";

@Controller("schedules")
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService
  ) {}

  @Get("")
  @ApiResponse({
    status: 200,
    type: [ScheduleResponse],
    description: "successful",
  })
  async getAllSchedules(@Res() res: Response) {
    console.log("[P]:::Get all schedule data");
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
    @Res() res: Response
  ) {
    const patientId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log("[P]:::Get schedule by patient id", patientId);
    let patient = await this.userService.getUserById(patientId);
    if (patient == null) {
      throw new NotFoundException("No patient found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByPatientId(
        patientId,
        patient
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
    @Res() res: Response
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log("[P]:::Get schedule by doctor id", doctorId);
    let doctor = await this.userService.getUserById(doctorId);
    if (doctor == null) {
      throw new NotFoundException("No doctor found, please try again");
    }
    try {
      let schedules = await this.scheduleService.getScheduleByDoctorId(
        doctorId,
        doctor
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

  @Post("create-by-doctor")
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
    console.log("[P]:::Create schedule data", schedule);
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

  @Put("accept-schedule")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async acceptSchedule(
    @Body() schedule: AcceptScheduleRequest,
    @Res() res: Response
  ) {
    console.log("[P]:::Accept schedule by id", schedule.schedule_id);
    try {
      await this.scheduleService.acceptSchedule(schedule.schedule_id);
      return res.json({
        message: "Schedule accepted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when accept schedule");
    }
  }

  @Put("reject-schedule")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async rejectSchedule(
    @Body() schedule: AcceptScheduleRequest,
    @Res() res: Response
  ) {
    console.log("[P]:::Reject schedule by id", schedule.schedule_id);
    try {
      await this.scheduleService.rejectSchedule(schedule.schedule_id);
      return res.json({
        message: "Schedule rejected successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when reject schedule");
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
    console.log("[P]:::Update schedule by id", schedule.id);
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

  @Delete("delete-schedule/:id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async deleteScheduleById(@Res() res: Response, @Param("id") id: string) {
    console.log("[P]:::Delete schedule:", id);
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
    console.log("[P]::: Get available schedules of doctor by doctor id", id);

    const today = new Date();
    const afterTomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2
    );
    const timestamp = Math.floor(afterTomorrow.getTime() / 1000);

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

  @Post("create-by-patient")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successfully",
  })
  async createScheduleByPatient(
    @Req() req: Request & { user?: UserGuardModel },
    @Body() schedule: ScheduleRequest,
    @Res() res: Response
  ) {
    console.log("[P]:::Create schedule by patient:", schedule);
    try {
      const { doctor_id } = schedule;
      schedule.status_id = 2;
      const patient = await this.userService.getUserByAccountId(
        req.user.accountId
      );
      schedule.patient_id = patient.id;
      let existingSchedule = await this.scheduleService.checkExistingSchedule(
        schedule
      );
      let countExistingSchedule =
        await this.scheduleService.countExistingSchedule(schedule);
      if (countExistingSchedule === 5)
        throw new InternalServerErrorException(
          "Quá giới hạn lịch được đặt, vui lòng đợi các bác sĩ phê duyệt lịch đã đặt trước khi tiếp tục"
        );
      if (!existingSchedule) {
        await this.scheduleService.createSchedule(schedule, doctor_id);
        return res.json({
          message: "Schedule created successfully",
        });
      } else {
        if (existingSchedule.status_id === 2)
          throw new InternalServerErrorException(
            "Bạn đã đặt lịch vào thời điểm này trước đó, vui lòng đợi bác sĩ phê duyệt"
          );
        if (existingSchedule.status_id === 1)
          throw new InternalServerErrorException(
            "Bạn đã có lịch vào thời điểm này, vui lòng kiểm tra lại"
          );
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        (<any>e).message || "Error when create schedule by doctor with time"
      );
    }
  }

  @Get("time/available-doctor/:schedule_time")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successfully",
  })
  async getAvailableDoctorByScheduleTime(
    @Res() res: Response,
    @Param("schedule_time") schedule_time: number
  ) {
    console.log("[P]:::Get available doctor by schedule time", schedule_time);
    try {
      const scheduleList = await this.scheduleService.getScheduleByStartTime(
        schedule_time
      );
      const doctorArray =
        await this.userService.getAvailableDoctorByScheduleTime(scheduleList);
      return res.json(doctorArray);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        "Error when get available doctor by schedule time"
      );
    }
  }

  @Put("update-result")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async updateScheduleResult(
    @Body() schedule: UpdateResultRequest,
    @Res() res: Response
  ) {
    console.log("[P]:::Update schedule result by id", schedule.schedule_id);
    try {
      await this.scheduleService.updateScheduleResult(schedule.schedule_id, schedule.result);
      return res.json({
        message: "Schedule updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update schedule");
    }
  }
}
