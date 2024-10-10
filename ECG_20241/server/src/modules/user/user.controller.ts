import { AuthenticationGuard } from "../common/guards/authentication.guard";
import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { Roles } from "../common/roles/role.decorator";
import { Role } from "../common/roles/role.enum";
import { AuthorizationGuard } from "../common/guards/authorization.guard";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(Role.Admin)
  @Get("")
  async findAll() {
    return await this.userService.findAll();
  }

  @Post("")
  async add(@Body() User: UserModel) {
    return await this.userService.add(User);
  }
}
