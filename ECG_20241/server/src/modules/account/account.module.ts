import { AccountRepository } from './model/account.repository';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account.service';
import { AccountModel } from './model/account.model';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        SequelizeModule.forFeature([AccountModel]),
        TokenModule
    ],
    controllers: [AccountController],
    providers: [AccountService, AccountRepository],
    exports: [AccountService]
})

export class AccountModule {}