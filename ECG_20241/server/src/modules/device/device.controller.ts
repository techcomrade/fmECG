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
import { DeviceModel } from "./model/device.model";

@Controller("device")
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get("")
  async getAllData(@Res() res: Response) {
    console.log(`[P]:::Get all devices data`);
    let devices = await this.deviceService.getAllData();
    if (!devices.length) {
      throw new NotFoundException("No device found, please try again");
    }
    return res.status(HttpStatus.OK).json({
      message: "Devices found",
      metadata: devices,
    });
  }

  @Post("create")
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
