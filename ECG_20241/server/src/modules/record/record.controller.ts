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
} from "@nestjs/common";
import { Response } from "express";
import { RecordService } from "./record.service";
import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { plainToInstance } from "class-transformer";
import { ApiResponse } from "@nestjs/swagger";

@Controller("records")
export class RecordController {
  constructor(private recordService: RecordService) {}

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
