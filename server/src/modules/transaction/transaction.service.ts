import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Transaction as SequelizeTransaction } from "sequelize";

@Injectable()
export class TransactionService {
  constructor(private readonly sequelize: Sequelize) {}

  async transaction(callback: (t: SequelizeTransaction) => Promise<void>) {
    const t = await this.sequelize.transaction();
    try {
      // Chạy callback với transaction
      await callback(t);
      // Commit khi thành công
      await t.commit();
      console.log("Transaction successful.");
      return true;
    } catch (error) {
      // Rollback nếu có lỗi
      await t.rollback();
      console.error("Transaction failed: ", error);
      throw error;
    }
  }
}
