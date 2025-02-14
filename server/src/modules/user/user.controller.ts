import { AuthenticationGuard } from "../authentication/authentication.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Res,
  BadRequestException,
  NotFoundException,
  Delete,
  Put,
  InternalServerErrorException,
  Param,
  Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { UserRequest } from "./dto/user.request";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { UserResponse } from "./dto/user.response";
import { plainToInstance } from "class-transformer";
import { UserGuardModel } from "../authentication/dto/user.guard.model";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getAllUsers(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    console.log(`[P]:::Get all users`);
    const user = req.user;
    console.log("user: ", user);
    try {
      let users = await this.userService.getAllUsers();
      if (!users.length) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, users);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all users");
    }
  }

  @Get("/doctors")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getAllDoctors(@Res() res: Response) {
    console.log(`[P]:::Get all doctors`);
    try {
      let users = await this.userService.getAllDoctors();
      if (!users.length) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, users);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all doctors");
    }
  }

  @Get("/except-admin")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getAllExceptAdmin(@Res() res: Response) {
    console.log(`[P]:::Get all except admin`);
    try {
      let users = await this.userService.getAllExceptAdmin();
      if (!users.length) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, users);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all except admin");
    }
  }

  @Get("/except-self")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getAllExceptSelf(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    console.log(`[P]:::Get all except self`);
    try {
      let self = await this.userService.getUserByAccountId(req.user.accountId);
      let users = await this.userService.getAllUsers();
      if (!users.length) {
        throw new NotFoundException("No user found, please try again");
      }
      users = users.filter((user) => user.id !== self.id);
      let result = plainToInstance(UserResponse, users);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get all except self");
    }
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: "Successful",
  })
  async getUserById(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response,
    @Param("id") id: string
  ) {
    try {
      let user_id;
      if (id === "user-info") {
        user_id = (
          await this.userService.getUserByAccountId(req.user.accountId)
        ).id;
      } else user_id = id;
      console.log(`[P]:::Get user by id: `, user_id);
      const user = await this.userService.getUserById(user_id);
      if (!user) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, user);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when get user by id");
    }
  }

  @Get("data/patient-data")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getPatientByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get all users by doctor id: `, doctorId);
    try {
      let user = await this.userService.getPatientByDoctorId(doctorId);
      if (!user) {
        throw new NotFoundException("No user found, please try again");
      }
      let result = plainToInstance(UserResponse, user);
      console.log(result);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get user by doctor id"
      );
    }
  }

  @Get("data/admin-patient-data")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getAdminAndPatientByDoctorId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    const doctorId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get all users by doctor id: `, doctorId);
    try {
      let user = await this.userService.getPatientByDoctorId(doctorId);
      if (!user) {
        throw new NotFoundException("No user found, please try again");
      }
      let admins = await this.userService.getAllAdmin();
      const adminData = admins.map((admin) => (<any>admin).dataValues);
      const mergedList = [...adminData, ...user];
      let result = plainToInstance(UserResponse, mergedList);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get user by doctor id"
      );
    }
  }

  @Get("data/doctor-id")
  @ApiResponse({
    status: 200,
    type: [UserResponse],
    description: "Successful",
  })
  async getDoctorByPatientId(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    const patientId = (
      await this.userService.getUserByAccountId(req.user.accountId)
    ).id;
    console.log(`[P]:::Get all doctors by patient id: `, patientId);
    try {
      let user = await this.userService.getDoctorByPatientId(patientId);
      if (!user) {
        throw new NotFoundException("No user found, please try again");
      }
      let admins = await this.userService.getAllAdmin();
      const adminData = admins.map((admin) => (<any>admin).dataValues);
      const mergedList = [...adminData, ...user];
      let result = plainToInstance(UserResponse, mergedList);
      return res.json(result);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when get user by patient id"
      );
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
    description: "successful",
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
