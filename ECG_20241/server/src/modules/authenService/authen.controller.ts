import { Controller, Get, Body, Post,  UseGuards } from '@nestjs/common';
import { UserModel } from '../user/model/user.model';
import { AuthenService } from './authen.service';
 
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
    async login(@Body() user: UserModel){
        return await this.authenService.login(user);
    }
}