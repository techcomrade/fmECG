import {
  Controller,
  Post,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  Param,
  Res,
  Body,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { DeviceDetailService } from "./device_detail.service";
import { ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DeviceDetailRequest } from "./dto/device_detail.request";
import { AuthenticationGuard } from "../authentication/authentication.guard";
import { AuthorizationGuard } from "../authentication/authorization.guard";
import { Roles } from "../authentication/decorators/role.decorator";
import { Role } from "../authentication/dto/role.enum";

@UseGuards(AuthenticationGuard)
@UseGuards(AuthorizationGuard)
@Controller("device_detail")
export class DeviceDetailController {
  constructor(private deviceDetailService: DeviceDetailService) {}

  @Roles(Role.Admin, Role.Doctor)
  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "successful",
  })
  async addDetail(@Body() detail: DeviceDetailRequest, @Res() res: Response) {
    console.log(`[P]:::Add device detail data: `, detail);
    try {
      await this.deviceDetailService.addDetail(detail);
      return res.json({
        message: "Device detail created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create device detail");
    }
  }


  @Roles(Role.Admin, Role.Doctor)
  @Put("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async updateDetailById(
    @Body() detail: DeviceDetailRequest,
    @Res() res: Response
  ) {
    console.log(`[P]:::Update device detail data: `, detail);
    try {
      await this.deviceDetailService.updateDetailById(detail, detail.id);
      return res.json({
        message: "Device detail updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to update device detail");
    }
  }

  @Roles(Role.Admin, Role.Doctor)
  @Delete(":detail_id")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "successful",
  })
  async deleteDeviceDetailById(
    @Res() res: Response,
    @Param("detail_id") detail_id: string
  ) {
    console.log(`[P]:::Delete device detail by id`, detail_id);
    try {
      await this.deviceDetailService.deleteDetailById(detail_id);
      return res.json({
        message: "Device detail deleted successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when delete device detail");
    }
  }
}