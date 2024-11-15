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
  Put,
  Req,
} from "@nestjs/common";
import { Response } from "express";
import { DeviceService } from "./device.service";
import { ApiResponse } from "@nestjs/swagger";
import { DeviceResponse } from "./dto/device.response";
import { plainToInstance } from "class-transformer";
import { DeviceRequest } from "./dto/device.request";
import { UserGuardModel } from "../authentication/dto/user.guard.model";
import { UserService } from "../user/user.service";

@Controller("device")
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private userService: UserService
  ) {}

  @Get("")
  @ApiResponse({
    status: 200,
    type: [DeviceResponse],
    description: "successful",
  })
  async getAllData(@Res() res: Response) {
    console.log(`[P]:::Get all devices data`);
    let devices = await this.deviceService.getAllData();
    if (!devices.length) {
      throw new NotFoundException("No device found, please try again");
    }
    let result = plainToInstance(DeviceResponse, devices);
    return res.json(result);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: DeviceResponse,
    description: "successful",
  })
  async getDeviceById(@Res() res: Response, @Param("id") id: string) {
    console.log(`[P]:::Get device by id:`, id);
    let device = await this.deviceService.getById(id);
    if (!device) {
      throw new NotFoundException("No device found, please try again");
    }
    let result = plainToInstance(DeviceResponse, device);
    return res.json(result);
  }

  @Get("type/:device_type_id")
  @ApiResponse({
    status: 200,
    type: [DeviceResponse],
    description: "successful",
  })
  async getDeviceByType(
    @Res() res: Response,
    @Param("device_type_id") device_type_id: string
  ) {
    console.log("[P}::: Get device by device type id");
    let device = await this.deviceService.getByDeviceTypeId(device_type_id);
    if (!device) {
      throw new NotFoundException("No device found, please check another type");
    }
    let result = plainToInstance(DeviceResponse, device);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get("data/doctor_id")
  @ApiResponse({
    status: 200,
    type: [DeviceResponse],
    description: "successful",
  })
  async getDeviceByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response,
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log("[P]::: Get device by doctor id");
    let devices = await this.deviceService.getByDoctorId(doctorId);
    if (!devices.length) {
      throw new NotFoundException("No devices found, please try again");
    }
    let result = plainToInstance(DeviceResponse, devices);
    return res.json(result);
  }

  @Get(":device_name")
  @ApiResponse({
    status: 200,
    type: [DeviceResponse],
    description: "successful",
  })
  async getDeviceByName(
    @Res() res: Response,
    @Param("device_name") device_name: string
  ) {
    console.log("[P]::: Get device by device name");
    let devices = await this.deviceService.getByDeviceName(device_name);
    if (!devices.length) {
      throw new NotFoundException(
        "No devices found, please check another name"
      );
    }
    let result = plainToInstance(DeviceResponse, devices);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post("create")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "successful",
  })
  async add(@Body() device: DeviceRequest, @Res() res: Response) {
    console.log(`[P]:::Add device data`, device);
    try {
      await this.deviceService.add(device);
      return res.json({
        message: "Device created successfully",
      });
    } catch (error) {
      throw new BadRequestException("Failed to create device");
    }
  }

  @Put("/update")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async updateDeviceById(@Res() res: Response, @Body() device: DeviceRequest) {
    console.log(`[P]:::Update device by id`, device.id);
    let checkExistDevice = await this.deviceService.getById(device.id);
    if (checkExistDevice == null) {
      throw new NotFoundException(
        "No device found to update, please try again"
      );
    }
    try {
      await this.deviceService.updateById(device, device.id);
      return res.json({
        message: "Device updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update device");
    }
  }

  @Delete(":device_id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async deleteDeviceById(
    @Res() res: Response,
    @Param("device_id") device_id: string
  ) {
    console.log(`[P]:::Delete device by id`, device_id);
    let checkExistDevice = await this.deviceService.getById(device_id);
    if (checkExistDevice == null) {
      throw new NotFoundException(
        "No device found to delete, please try again"
      );
    }
    try {
      await this.deviceService.deleteById(device_id);
      return res.json({
        message: "Device deleted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when delete device");
    }
  }
}
