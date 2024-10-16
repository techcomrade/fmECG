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
import { DeviceService } from "./device.service";
import { DeviceModel } from "../../entities/device.model";
import { ApiResponse } from "@nestjs/swagger";
import { DeviceResponse } from "./dto/device.response";

@Controller("device")
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

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
    return res.status(HttpStatus.OK).json(devices);
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
    return res.status(HttpStatus.OK).json(device);
  }

  @Get("/:device_name")
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
    return res.status(HttpStatus.OK).json(devices);
  }

  @Post("create")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async add(@Body() device: DeviceModel, @Res() res: Response) {
    console.log(`[P]:::Add device data`, device);
    try {
      await this.deviceService.add(device);
      return res.status(HttpStatus.OK).json({
        message: "Device created successfully",
      });
    } catch (error) {
      throw new BadRequestException("Failed to create device");
    }
  }

  @Post("id/:device_id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async update(
    @Res() res: Response,
    @Body() device: DeviceModel,
    @Param("device_id") device_id: string
  ) {
    console.log(`[P]:::Update device by id`, device_id);
    let checkExistDevice = await this.deviceService.getById(device_id);
    if (checkExistDevice == null) {
      throw new NotFoundException(
        "No device found to update, please try again"
      );
    }
    try {
      await this.deviceService.updateById(device, device_id);
      return res.status(HttpStatus.OK).json({
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
  async delete(@Res() res: Response, @Param("device_id") device_id: string) {
    console.log(`[P]:::Delete device by id`, device_id);
    let checkExistDevice = await this.deviceService.getById(device_id);
    if (checkExistDevice == null) {
      throw new NotFoundException(
        "No device found to delete, please try again"
      );
    }
    try {
      await this.deviceService.deleteById(device_id);
      return res.status(HttpStatus.OK).json({
        message: "Device deleted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when delete device");
    }
  }
}
