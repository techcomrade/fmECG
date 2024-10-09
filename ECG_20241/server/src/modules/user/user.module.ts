import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserModel } from '../../entities/user.model';
import { TokenModule } from '../token/token.module';
import { UserStatusModel }  from '../../entities/user_status.model';
import { UserRoleModel } from '../../entities/user_role.model';

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel,UserStatusModel, UserRoleModel]),
        TokenModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule {}