import { AuthenticationGuard } from './../common/guards/authentication.guard';
import { Controller, Get, Post, Body,  UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountModel } from './model/account.model';
import { Roles } from '../common/roles/role.decorator';
import { Role } from '../common/roles/role.enum';
import { AuthorizationGuard } from '../common/guards/authorization.guard';

@Controller("accounts")
export class AccountController {
    constructor(
        private accountService: AccountService
    ){}

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(Role.Admin)
    @Get('')
    async findAll(){
        return await this.accountService.findAll();
    }

    @Post('register')
    async add(@Body() account: AccountModel){
        return await this.accountService.add(account);
    }

}