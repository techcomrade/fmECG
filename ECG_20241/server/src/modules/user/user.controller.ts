import { AuthenticationGuard } from "../common/guards/authentication.guard";
import { Controller, Get, Post, Body, UseGuards, Query, Res, BadRequestException, HttpStatus, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from 'express';
import { UserRequest } from "./dto/user.request";
import { ApiResponse } from "@nestjs/swagger";
import { UserResponse } from "./dto/user.response";
import { plainToInstance } from "class-transformer";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)
  @Get('')
  @ApiResponse({ status: 200, type: [UserResponse], description: "successful" })
  async getAllUsers(@Res() res: Response) {
    console.log(`[P]:::Get all users`);
    let users = await this.userService.findAll();
    if (!users.length) {
      throw new NotFoundException("No user found, please try again");
    }
    let result = plainToInstance(UserResponse, users);
    return res.status(HttpStatus.OK).json({
      message: "Records found",
      metadata: result,
    });
  }

  @Post('')
  async add(@Body() User: UserModel) {
    return await this.userService.add(User);
  }

  @Get('details')
  @ApiResponse({ status: 200, type: [UserResponse], description: "successful" })
  async findByUserName(@Res() res: Response, @Query('username') username: string) {
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
