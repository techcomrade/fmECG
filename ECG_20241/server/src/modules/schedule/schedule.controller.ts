import { AuthenticationGuard } from "../common/guards/authentication.guard";
import { Controller, Get, Post, Body, UseGuards, Query, Res, BadRequestException, HttpStatus, NotFoundException, Delete, Put, InternalServerErrorException } from "@nestjs/common";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from 'express';
import { ApiResponse } from "@nestjs/swagger";

import { ScheduleResponse } from "./dto/schedule.response";
import { ScheduleService } from "./schedule.service";

@Controller('schedules')
export class UserController {
  constructor(private scheduleService: ScheduleService) { }

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)
  @Get("")
  @ApiResponse({ status: 200, type: [ScheduleResponse], description: "successful" })
  async getAllSchedules() {
    return await this.scheduleService.findAll();
  }
}
