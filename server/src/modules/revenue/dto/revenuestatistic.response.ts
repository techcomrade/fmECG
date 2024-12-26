import { Expose, Exclude } from "class-transformer";

@Exclude()
export class RevenueStatisticResponse {

  @Expose()
  total_revenue: number;
  @Expose()
  revenue_by_year: { year: number; revenue: number }[];

  @Expose()
  revenue_by_month: { month: number; revenue: number }[];

  @Expose()
  revenue_by_date: { date: string; revenue: number }[];
}