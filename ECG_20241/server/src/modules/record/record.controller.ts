import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Body,
  Param,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { RecordService } from "./record.service";
import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { plainToInstance } from "class-transformer";

@Controller("records")
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Post("")
  async createRecord(@Body() record: RecordRequest, @Res() res: Response) {
    console.log(`[P]:::Add record data`, record);
    try {
      await this.recordService.add(record);
      return res.status(HttpStatus.OK).json({
        message: "Record created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create record");
    }
  }

  @Get("")
  async getAllRecord(@Res() res: Response) {
    console.log(`[P]:::Get all records`);
    let records = await this.recordService.getAllRecord();
    if (!records.length) {
      throw new NotFoundException("No record found, please try again");
    }
    let result = plainToInstance(RecordResponse, records);
    return res.status(HttpStatus.OK).json({
      message: "Records found",
      metadata: result,
    });
  }

  @Get("device/:device_name")
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
    return res.status(HttpStatus.OK).json({
      message: "Records found",
      metadata: result,
    });
  }

  @Post("update")
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
      return res.status(HttpStatus.OK).json({
        message: "Record updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update record");
    }
  }

  @Delete(":record_id")
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
      return res.status(HttpStatus.OK).json({
        message: "Record deleted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when delete record");
    }
  }
}
