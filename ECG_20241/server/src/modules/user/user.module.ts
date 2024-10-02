import { UserRepository } from './model/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserModel } from './model/user.model';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel]),
        TokenModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule {}