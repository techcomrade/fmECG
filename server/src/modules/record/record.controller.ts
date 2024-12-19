import {
  Controller,
  Get,
  Post,
  Delete,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Body,
  Param,
  Res,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { RecordService } from "./record.service";
import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { plainToInstance } from "class-transformer";
import { ApiResponse } from "@nestjs/swagger";
import { UserGuardModel } from "../authentication/dto/user.guard.model";
import { UserService } from "../user/user.service";
import { AuthorizationGuard } from "../authentication/authorization.guard";
import { Roles } from "../authentication/decorators/role.decorator";
import { Role } from "../authentication/dto/role.enum";

@UseGuards(AuthorizationGuard)
@Controller("records")
export class RecordController {
  constructor(
    private recordService: RecordService,
    private userService: UserService
  ) {}

  @Roles(Role.Admin, Role.Doctor)
  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successful",
  })
  async createRecord(@Body() record: RecordRequest, @Res() res: Response) {
    console.log(`[P]:::Add record data`, record);
    try {
      await this.recordService.add(record);
      return res.json({
        message: "Record created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create record");
    }
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get("")
  @ApiResponse({
    status: 200,
    type: [RecordResponse],
    description: "Successful",
  })
  async getAllRecord(@Res() res: Response) {
    console.log(`[P]:::Get all records`);
    let records = await this.recordService.getAllRecord();
    if (!records.length) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, records);
    return res.json(result);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get(":id")
  @ApiResponse({
    status: 200,
    type: RecordResponse,
    description: "Successful",
  })
  async getRecordById(@Res() res: Response, @Param("id") id: string) {
    console.log(`[P]:::Get record by id: `, id);
    let record = await this.recordService.getRecordById(id);
    if (!record) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, record);
    return res.json(result);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get("data/patient-id")
  @ApiResponse({
    status: 200,
    type: [RecordResponse],
    description: "Successful",
  })
  async getRecordByPatientId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    const patientId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get record by patient id: `, patientId);
    let record = await this.recordService.getRecordByPatientId(patientId);
    if (!record) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, record);
    return res.json(result);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get("data/doctor-id")
  @ApiResponse({
    status: 200,
    type: [RecordResponse],
    description: "Successful",
  })
  async getRecordByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get record by doctor id: `, doctorId);
    let record = await this.recordService.getRecordByDoctorId(doctorId);
    if (!record) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, record);
    return res.json(result);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Get("device/:device_name")
  @ApiResponse({
    status: 200,
    type: [RecordResponse],
    description: "Successful",
  })
  async getRecordByDeviceName(
    @Res() res: Response,
    @Param("device_name") device_name: string
  ) {
    console.log(`[P]:::Get records by device name`);
    let records = await this.recordService.getRecordByDeviceName(device_name);
    if (!records.length) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, records);
    return res.json(result);
  }

  @Roles(Role.Admin, Role.Doctor)
  @Put("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async updateRecordById(@Res() res: Response, @Body() record: RecordRequest) {
    console.log(`[P]:::Update record by id`, record.id);
    let checkExistRecord = await this.recordService.getRecordById(record.id);
    if (checkExistRecord == null) {
      throw new NotFoundException(
        "No record found to update, please try again"
      );
    }
    try {
      await this.recordService.updateRecordById(record, record.id);
      return res.json({
        message: "Record updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update record");
    }
  }

  @Roles(Role.Admin, Role.Doctor)
  @Delete(":record_id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async deleteRecordById(
    @Res() res: Response,
    @Param("record_id") record_id: string
  ) {
    console.log(`[P]:::Delete record by id`, record_id);
    let checkExistRecord = await this.recordService.getRecordById(record_id);
    if (checkExistRecord == null) {
      throw new NotFoundException(
        "No record found to delete, please try again"
      );
    }
    try {
      await this.recordService.deleteRecordById(record_id);
      return res.json({
        message: "Record deleted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when delete record");
    }
  }
}