

import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RevenueModel } from "../../entities/revenue.model";
import { RevenueController } from "./revenue.controller";
import { RevenueService } from "./revenue.service";
import { RevenueRepository } from "./revenue.repository";


@Module({
  imports: [
    SequelizeModule.forFeature([
      RevenueModel,
    ]),
  ],
  controllers: [RevenueController],
  providers: [RevenueService, RevenueRepository],
  exports: [RevenueService],
})
export class RevenueModule {}