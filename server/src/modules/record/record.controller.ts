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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { Response } from "express";
import { RecordService } from "./record.service";
import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { plainToInstance } from "class-transformer";
import {
  ApiBody,
  ApiConsumes,
  ApiResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { UserGuardModel } from "../authentication/dto/user.guard.model";
import { UserService } from "../user/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import * as path from "path";

@Controller("records")
export class RecordController {
  constructor(
    private recordService: RecordService,
    private userService: UserService
  ) {}

  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successful",
  })
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ["text/csv", "text/plain", "audio/wav"];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Invalid file type"), false);
        }
      },
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        data: {
          type: "object",
          $ref: getSchemaPath(RecordRequest),
        },
      },
    },
  })
  async createRecord(
    @UploadedFile() file: Express.Multer.File,
    @Body() record: RecordRequest,
    @Res() res: Response
  ) {
    console.log(`[P]:::Add record data`, record);
    console.log(`[P]:::Uploaded file`, file);
    try {
      await this.recordService.add(record, file);
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

  @Get("download/:id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async downloadRecord(@Res() res: Response, @Param("id") id: string) {
    console.log(`[P]:::Download record csv by id`, id);
    let checkExistRecord = await this.recordService.getRecordById(id);
    if (checkExistRecord == null) {
      throw new NotFoundException(
        "No record found to delete, please try again"
      );
    }
    try {
      const record = await this.recordService.getRecordById(id);
      let filePath = record.data_rec_url;
      filePath = filePath.replace(/\\/g, "/");
      filePath = path.join(__dirname, "../../../..", filePath);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException("File not found on the server");
      }

      const fileName = path.basename(filePath);

      return res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          throw new NotFoundException("Error downloading the file");
        }
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error when download file");
    }
  }
}
