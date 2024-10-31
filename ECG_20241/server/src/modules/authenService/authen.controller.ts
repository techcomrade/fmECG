import { Controller, Get, Body, Post,  UseGuards } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { ApiResponse, ApiBody } from "@nestjs/swagger";
import { AccountRequest } from '../account/dto/account.request';

@Controller("auth")
export class AuthenController{

    constructor(
        private authenService: AuthenService
    ){}

    @Post('register')
    async register(@Body() account: AccountRequest){
        return await this.authenService.register(account);
    }

    // @Post('login')
    // @ApiBody({ type: AuthenRequest })
    // @ApiResponse({ status: 200, description: 'List of users', type: Boolean })
    // async login(@Body() user: AuthenRequest){
    //     return await this.authenService.login(user);
    // }
}