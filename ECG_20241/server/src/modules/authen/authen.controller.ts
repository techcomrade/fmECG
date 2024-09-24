import { Controller, Get, Body, Post,  UseGuards } from '@nestjs/common';
import { AccountModel } from '../account/model/account.model';
import { AuthenService } from './authen.service';
import { UserModel } from '../user/model/user.model';
 
@Controller("auth")
export class AuthenController{

    constructor(
        private authenService: AuthenService
    ){}

    @Post('register')
    async register(@Body() data: any){
        return await this.authenService.register(data);
    }

    @Post('login')
    async login(@Body() account: AccountModel){
        return await this.authenService.login(account);
    }
}