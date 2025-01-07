import { Expose, Exclude } from "class-transformer";

@Exclude()
export class RevenueStatisticResponse {

  @Expose()
  totalRevenue: number;

  @Expose()
  totalRevenueByMonth: number;

  @Expose()
  totalRevenueByDate: number;


  @Expose()
  revenueByYear: { year: number; revenue: number }[];

  @Expose()
  revenueByMonth: { month: number; revenue: number }[];

  @Expose()
  revenueByDate: { date: string; revenue: number }[];
  
}