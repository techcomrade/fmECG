const { v4: uuidv4 } = require("uuid");

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleModel } from "../../entities/schedule.model";

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository
  ) { }


  async findAll(): Promise<ScheduleModel[]> {
    return this.scheduleRepository.findAll();
  }
}
