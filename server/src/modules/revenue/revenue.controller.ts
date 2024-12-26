import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
  } from "@nestjs/common";
  import { ApiResponse } from "@nestjs/swagger";
  import { plainToInstance } from "class-transformer";
  import { Response } from "express";
  import { RevenueRequest } from "./dto/revenue.request";
  import { RevenueResponse } from "./dto/revenue.response";
  import { RevenueService } from "./revenue.service";
  import { RevenueStatisticResponse } from "./dto/revenuestatistic.response";
  
  @Controller("revenue")
  export class RevenueController {
    constructor(private RevenueService: RevenueService) {}
  
    @Get("")
    @ApiResponse({
      status: 200,
      type: [RevenueResponse],
      description: "Successful",
    })
    async getAllRevenue(@Res() res: Response) {
      console.log("[P]:::Get all revenue data");
      try {
        const revenue = await this.RevenueService.getAllRevenues();
        if (!revenue.length) {
          throw new NotFoundException("No revenue found, please try again");
        }
          const result = plainToInstance(RevenueResponse, revenue);
        return res.json(result);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error when get all revenue");
      }
    }
    @Get("total")
    @ApiResponse({
        status: 200,
        type: Number,
        description: "Successful",
    })
    async getTotalRevenue(@Res() res: Response) {
        console.log("[P]:::Get total revenue data");
        try {
            const totalRevenue = await this.RevenueService.getTotalRevenue();
            return res.json({totalRevenue});
        } catch (error) {
            console.log(error);
             throw new InternalServerErrorException("Error when get total revenue")
        }
    }

    @Get("statistic/:year")
    @ApiResponse({
        status: 200,
        type: RevenueStatisticResponse,
        description: "Successful",
    })
    async getRevenueStatistic(@Param('year') year: number ,@Res() res: Response) {
      console.log("[P]:::Get revenue statistic");
      try {
          const revenueStatistic = await this.RevenueService.getRevenueStatistic(year);
          return res.json(revenueStatistic)
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error when get all revenue");
      }
    }
  
    @Post("")
    @ApiResponse({
      status: 201,
      type: Boolean,
      description: "Successful",
    })
    async addRevenue(@Body() item: RevenueRequest, @Res() res: Response) {
      console.log("[P]:::Add revenue data", item);
      try {
        const revenue = await this.RevenueService.createRevenue(item);
        return res.json(plainToInstance(RevenueResponse, revenue));
      } catch (error) {
        console.log(error);
        throw new BadRequestException("Failed to create revenue");
      }
    }
  
    @Put(":id")
    @ApiResponse({
      status: 200,
      type: Boolean,
      description: "Successful",
    })
    async updateIRevenueById(
      @Param("id") id: string,
      @Body() item: RevenueRequest,
      @Res() res: Response
    ) {
      console.log("[P]:::Update item by id", id);
      try {
        const updatedRevenue = await this.RevenueService.updateRevenue(id, item);
        if (!updatedRevenue) {
          throw new NotFoundException("No revenue found to update, please try again");
        }
        return res.json(plainToInstance(RevenueResponse, updatedRevenue));
      } catch (error) {
        console.log(error);
          if(error instanceof NotFoundException) {
              throw new NotFoundException("No revenue found to update, please try again")
          }
        throw new InternalServerErrorException("Error when update revenue");
      }
    }
  
    @Delete(":id")
    @ApiResponse({
      status: 200,
      type: Boolean,
      description: "Successful",
    })
    async deleteRevenueById(@Res() res: Response, @Param("id") id: string) {
      console.log("[P]:::Delete revenue:", id);
      try {
        await this.RevenueService.deleteRevenueById(id);
        return res.json({
          message: "revenue has been deleted successfully",
        });
      } catch (error) {
        throw new InternalServerErrorException("Error when delete revenue");
      }
    }
  }