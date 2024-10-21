// import { AuthenticationGuard } from "../common/guards/authentication.guard";
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   UseGuards,
//   Query,
//   Res,
//   BadRequestException,
//   HttpStatus,
//   NotFoundException,
//   Delete,
//   Put,
//   InternalServerErrorException,
// } from "@nestjs/common";
// import { UserService } from "./user.service";
// import { UserModel } from "../../entities/user.model";
// import { Roles } from "../common/roles/role.decorator";
// import { Role } from "../common/roles/role.enum";
// import { AuthorizationGuard } from "../common/guards/authorization.guard";
// import { Response } from "express";
// import { ApiResponse } from "@nestjs/swagger";
// import { plainToInstance } from "class-transformer";

// @Controller("consultation_schedules")
// export class ConsultationSchedules {
//   constructor(
//     private userService: UserService
// ) { }

//   // @UseGuards(AuthenticationGuard, AuthorizationGuard)
//   // @Roles(Role.Admin)

//   @Get("")
//   @ApiResponse({
//     status: 200,
//     type: [UserResponse],
//     description: "Successful"
//   })
//   async getAllUsers(@Res() res: Response) {
//     console.log(`[P]:::Get all users`);
//     try {
//       let users = await this.userService.getAllUsers();
//       if (!users.length) {
//         throw new NotFoundException("No user found, please try again");
//       }
//       let result = plainToInstance(UserResponse, users);
//       return res.json(result);
//     }
//     catch (error) {
//       console.log(error);
//       throw new InternalServerErrorException("Error when get all users");
//     }
//   }
// }
