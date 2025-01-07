import { Injectable } from "@nestjs/common";
import { RevenueRequest } from "./dto/revenue.request";
import { RevenueResponse } from "./dto/revenue.response";
import { RevenueRepository } from "./revenue.repository";
import { RevenueModel } from "../../entities/revenue.model";
import { RevenueStatisticResponse } from "./dto/revenuestatistic.response";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RevenueService {
  constructor(private revenueRepository: RevenueRepository) {}

  async getAllRevenues(): Promise<RevenueModel[]> {
    return await this.revenueRepository.getAllRevenues();
  }

  async getTotalRevenue(): Promise<number> {
    const allTotalRevenue: RevenueModel[] =
      await this.revenueRepository.getAllRevenues();
    let totalRevenue: number = 0;
    for (const record of allTotalRevenue) {
      totalRevenue += record.fee;
    }
    return totalRevenue;
  }

  async getRevenueById(id: string): Promise<RevenueResponse> {
    return this.revenueRepository.getRevenueById(id);
  }

  async createRevenue(revenue: RevenueRequest): Promise<RevenueResponse> {
    return this.revenueRepository.createRevenue(revenue);
  }

  async updateRevenue(id: string, revenue: RevenueRequest) {
    return this.revenueRepository.updateRevenueById(id, revenue);
  }

  async deleteRevenueById(id: string, t?: any) {
    return this.revenueRepository.deleteRevenueById(id);
  }

  async getRevenueByDate(
    startDate: Date,
    endDate: Date
  ): Promise<RevenueResponse[]> {
    return this.revenueRepository.getRevenueByDate(startDate, endDate);
  }

  async getRevenueByYear(year: number): Promise<RevenueResponse[]> {
    return this.revenueRepository.getRevenueByYear(year);
  }

    async getTotalRevenueByDate(startDate: Date, endDate: Date): Promise<number> {
        const revenueByDate = await this.revenueRepository.getRevenueByDate(
            startDate,
            endDate
        );
        return revenueByDate.reduce((sum, record) => sum + record.fee, 0);
    }

    async getTotalRevenueByMonth(year: number, month: number): Promise<number> {
      const revenueByMonth = await this.revenueRepository.getRevenueByMonth(year, month);
      return revenueByMonth.reduce((sum, record) => sum + record.fee, 0);
    }

  async getTotalRevenueByYear(year: number): Promise<any> {
    return this.revenueRepository.getTotalRevenueByYear(year);
  }

  async getRevenueStatistic(year: number): Promise<RevenueStatisticResponse> {
      const revenueByYear = await this.revenueRepository.getRevenueByYear(year);
      const totalRevenue = await this.getTotalRevenueByYear(year);
      const totalRevenueByMonth = await this.getTotalRevenueByMonth(year, new Date().getMonth() + 1)
     const totalRevenueByDate = await this.getTotalRevenueByDate(new Date(year, new Date().getMonth(), new Date().getDate()), new Date(year, new Date().getMonth(), new Date().getDate() ) )


    const revenueByMonth = this.calculateMonthlyRevenue(revenueByYear, year);
    const revenueByDate = await this.getRevenueByDateOfYear(year);

    return {
      totalRevenue: totalRevenue[0]?.totalAmount,
      totalRevenueByMonth: totalRevenueByMonth,
      totalRevenueByDate: totalRevenueByDate,
      revenueByYear: [{ year: year, revenue: totalRevenue[0]?.totalAmount }],
      revenueByMonth: revenueByMonth,
      revenueByDate: revenueByDate,
    };
  }

  private calculateMonthlyRevenue(
    revenues: RevenueResponse[],
    year: number
  ): { month: number; revenue: number }[] {
    const monthlyRevenueMap = new Map<number, number>();

    for (const revenue of revenues) {
      const month = revenue.createdAt.getMonth() + 1;
      if (monthlyRevenueMap.has(month)) {
        monthlyRevenueMap.set(
          month,
          (monthlyRevenueMap.get(month) || 0) + revenue.fee
        );
      } else {
        monthlyRevenueMap.set(month, revenue.fee);
      }
    }

    const monthlyRevenue: { month: number; revenue: number }[] = [];
    for (const [month, revenue] of monthlyRevenueMap) {
      monthlyRevenue.push({ month, revenue });
    }

    return monthlyRevenue;
  }

  private async getRevenueByDateOfYear(
    year: number
  ): Promise<{ date: string; revenue: number }[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const revenueByDate = await this.revenueRepository.getRevenueByDate(
      startDate,
      endDate
    );
    const result = revenueByDate.map((item) => {
      const date = item.createdAt.toISOString().split("T")[0];
      return {
        date: date,
        revenue: item.fee,
      };
    });
    return result;
  }
}