import { Response } from 'express';
import { AuthenticationGuard } from '../common/guards/authentication.guard';
import { Controller, Get, Post, Body, UseGuards, Res, NotFoundException, Param, HttpStatus, Query, BadRequestException, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountModel } from '../../entities/account.model';
import { Roles } from '../common/roles/role.decorator';
import { Role } from '../common/roles/role.enum';
import { AuthorizationGuard } from '../common/guards/authorization.guard';

@Controller("accounts")
export class AccountController {
    constructor(
        private accountService: AccountService
    ) { }

    // @UseGuards(AuthenticationGuard, AuthorizationGuard)
    // @Roles(Role.Admin)
    @Get('all')
    async findAll(@Res() res: Response) {
        console.log(`[P]:::Get all accounts `);
        try {
            const accounts = await this.accountService.findAll();
            return res.status(HttpStatus.OK).json({
                message: 'Account found',
                metadata: accounts
            }); 
        }
        catch (err) {
            throw new NotFoundException(
                "No account found, please try again"
            );
        }
    }

    @Post('')
    async add(@Body() Account: AccountModel) {
        return await this.accountService.add(Account);
    }

    @Get('details')
    async findByEmail(@Res() res: Response, @Query('email') email: string) {
        console.log(`[P]:::Get account by email`, email);
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        try {
            const account = await this.accountService.findByEmail(email);

            return res.status(HttpStatus.OK).json({
                message: 'Account found',
                metadata: account,
            });
        } catch (err) {
            throw new NotFoundException('No account found, please try again');
        }
    }

    @Delete('')
    async deleteAccount(@Res() res: Response, @Query('email') email: string) {
        console.log(`[P]:::Delete account by email: `, email);
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        try {
            const account = await this.accountService.deleteByEmail(email);

            return res.status(HttpStatus.OK).json({
                message: 'Account deleted',
                metadata: account,
            });
        } catch (err) {
            throw new NotFoundException('No account found, please try again');
        }
    }
}