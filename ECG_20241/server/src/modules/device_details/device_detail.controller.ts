import {
  Controller,
  Get,
  Post,
  Put,
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
import { DeviceDetailService } from "./device_detail.service";
import { ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

@Controller("device_detail")
export class DeviceDetailController {
  constructor(private deviceDetailService: DeviceDetailService) {}
}
