import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountModel } from 'src/entities/account.model';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(AccountModel)
    private accountModel: typeof AccountModel,
  ) {}

  async getById(id: string) {
    return await this.accountModel.findOne({ where: { id: id } });
  }
  async add() {
    return await this.accountModel.create({
      email: 'test',
      password: 'test',
    });
  }
}
