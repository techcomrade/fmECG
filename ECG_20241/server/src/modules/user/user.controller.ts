import { AuthenticationGuard } from "../common/guards/authentication.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Res,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Delete,
  Put,
  InternalServerErrorException,
  Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";
import { Response } from "express";
import { UserRequest } from "./dto/user.request";
import { ApiResponse } from "@nestjs/swagger";
import { UserResponse } from "./dto/user.response";
import { plainToInstance } from "class-transformer";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) { }

  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(Role.Admin)

  @Get("")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful"
  })
  async getAllUsers(@Res() res: Response) {
    console.log(`[P]:::Get all users`);
    try {
      let users = await this.userService.getAllUsers();
      if (!users.length) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, users);
      return res.json(result);
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all users");
    }
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Successful"
  })
  async getUserById(@Res() res: Response, @Param("id") id: string) {
    console.log(`[P]:::Get user by id: `, id);
    try {
      let user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, user);
      return res.json(result);
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get user by id");
    }
  }

  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successful",
  })
  async createUser(@Body() user: UserRequest, @Res() res: Response) {
    console.log(`[P]:::Add user data`, user);
    try {
      await this.userService.add(user);
      return res.json({
        message: "User created successfully",
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to create user");
    }
  }

  @Get("username/:username")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "successful"
  })
  async getUserByUserName(
    @Res() res: Response,
    @Param("username") username: string
  ) {
    console.log(`[P]:::Find user by username: `, username);
    if (!username) {
      throw new BadRequestException("username is required");
    }
    try {
      const users = await this.userService.getUserByUserName(username);
      return res.json(users);
    } catch (err) {
      throw new NotFoundException("No user found, please try again");
    }
  }

  @Put("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async updateUserById(@Res() res: Response, @Body() user: UserRequest) {
    console.log(`[P]:::Update user by id`, user.id);
    let checkExistUser = await this.userService.getUserById(user.id);
    if (checkExistUser == null) {
      throw new NotFoundException("No user found to update, please try again");
    }
    try {
      await this.userService.updateUserById(user, user.id);
      return res.json({
        message: "User updated successfully",
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when update user");
    }
  }

  @Delete("")
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "Successful",
  })
  async deleteUserById(@Res() res: Response, @Query("id") id: string) {
    console.log(`[P]:::Delete user by id`, id);
    let checkExistUser = await this.userService.getUserById(id);
    if (checkExistUser == null) {
      throw new NotFoundException("No user found to delete, please try again");
    }
    try {
      await this.userService.deleteUserById(id);
      return res.json({
        message: "User has been deleted successfully",
      });
    } catch (error) {
      throw new InternalServerErrorException("Error when delete user");
    }
  }
}
