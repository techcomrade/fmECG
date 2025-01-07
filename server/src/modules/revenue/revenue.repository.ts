import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RevenueModel } from "../../entities/revenue.model";
import { RevenueResponse } from "./dto/revenue.response";
import { RevenueRequest } from "./dto/revenue.request";
import { Sequelize } from "sequelize-typescript";
import { Op } from 'sequelize';


@Injectable()
export class RevenueRepository {
  constructor(
    @InjectModel(RevenueModel)
    private revenueModel: typeof RevenueModel,
      private sequelize: Sequelize
  ) {}

    async getAllRevenues(): Promise<RevenueModel[]> {
        return await this.revenueModel.findAll();
    }

    async createRevenue(revenue: RevenueRequest) {
        return await this.revenueModel.create(
            {
                id: revenue.id,
                schedule_id: revenue.schedule_id,
                schedule_type: revenue.schedule_type,
                patient_id: revenue.patient_id,
                doctor_id: revenue.doctor_id,
                 serviceType: revenue.serviceType,
                 fee: revenue.fee,
            }
        );
    }

    async getRevenueById(id: string): Promise<RevenueResponse> {
        return await this.revenueModel.findOne({
            where: {
                id: id,
            },
        });
    }

    async updateRevenueById(id: string, revenue: RevenueRequest) {
        return await this.revenueModel.update(
          {
            schedule_id: revenue.schedule_id,
            schedule_type: revenue.schedule_type,
            patient_id: revenue.patient_id,
            doctor_id: revenue.doctor_id,
            serviceType: revenue.serviceType,
            fee: revenue.fee,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }


      async deleteRevenueById(id: string) {
        return await this.revenueModel.destroy({
          where: {
            id: id,
          },
        });
      }

      async getRevenueByDate(startDate: Date, endDate: Date): Promise<RevenueModel[]> {
        return await this.revenueModel.findAll({
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        });
    }

  async getRevenueByMonth(year: number, month: number): Promise<RevenueModel[]> {
    const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      return this.revenueModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
  }

  async getRevenueByYear(year: number): Promise<RevenueModel[]> {
    return await this.revenueModel.findAll({
      where: this.sequelize.where(
          this.sequelize.fn('YEAR', this.sequelize.col('createdAt')),
          year
      )
    });
}

    async getTotalRevenueByYear(year: number): Promise<{ totalAmount: number }> {
        const result = await this.revenueModel.findAll({
            attributes: [[this.sequelize.fn('SUM', this.sequelize.col('fee')), 'totalAmount']],
            where: this.sequelize.where(
                this.sequelize.fn('YEAR', this.sequelize.col('createdAt')),
                year
            )
        });

       return result.length > 0 ? { totalAmount: Number(result[0].get('totalAmount')) || 0 } : { totalAmount: 0 };
    }
}