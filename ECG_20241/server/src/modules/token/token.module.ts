import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './model/token.repository';
import { TokenModel } from './model/token.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forFeature([TokenModel]),
        // UserModule
    ],
    providers: [TokenService, JwtService, TokenRepository],
    exports:[TokenService]
})

export class TokenModule {}