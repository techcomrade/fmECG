import { AuthenticationGuard } from "../common/guards/authentication.guard";
import { Controller, Get, Post, Body, UseGuards, Query, Res, BadRequestException, HttpStatus, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)
  @Get('')
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('')
  async add(@Body() User: UserModel) {
    return await this.userService.add(User);
  }

  @Get('details')
  async findByUserName(@Res() res: Response, @Query('username') username: string){
    console.log(`[P]:::Find user by username: `, username)
    if(!username){
      throw new BadRequestException("username is required");
    }
    try {
      const users = await this.userService.findByUserName(username);
      return res.status(HttpStatus.OK).json({
        message: 'User found',
        metadata: users
      });
    }
    catch (err) {
      throw new NotFoundException('No user found, please try again');
    }
  }
}
