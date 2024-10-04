import { Controller, Get, Body, Post,  UseGuards } from '@nestjs/common';
import { UserModel } from '../user/model/user.model';
import { AuthenService } from './authen.service';
import { AuthenRequest } from './model/dto/authen.request';
import { ApiResponse, ApiBody } from "@nestjs/swagger";

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
    @ApiBody({ type: AuthenRequest })
    @ApiResponse({ status: 200, description: 'List of users', type: Boolean })
    async login(@Body() user: AuthenRequest){
        return await this.authenService.login(user);
    }
}