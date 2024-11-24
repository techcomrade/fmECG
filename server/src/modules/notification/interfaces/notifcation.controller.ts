import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Body,
  Post,
  Put,
  InternalServerErrorException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AuthenticationGuard } from "../../authentication/authentication.guard";
import { AuthorizationGuard } from "../../authentication/authorization.guard";
import { NotificationService } from "./notification.service";
import { Role } from "../../authentication/dto/role.enum";
import { Roles } from "../../authentication/decorators/role.decorator";
import { plainToInstance } from "class-transformer";
import { NotificationResponse } from "../dto/notification.response";
import { Response } from "express";
import { UserGuardModel } from "../../authentication/dto/user.guard.model";
import { UserResponse } from "../../user/dto/user.response";
import { UserService } from "../../user/user.service";
import { NotificationRequest } from "../dto/notification.request";

@Controller("notification")
@ApiBearerAuth("access-token")
@UseGuards(AuthenticationGuard)
@UseGuards(AuthorizationGuard)
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  @Roles(Role.Admin)
  @Get("")
  @ApiResponse({
    status: 200,
    type: [NotificationResponse],
    description: "Successfully",
  })
  async getAllNotifications(@Req() req: Request, @Res() res: Response) {
    try {
      const notifications =
        await this.notificationService.getAllNotifications();
      const result = plainToInstance(NotificationResponse, notifications);
      return res.json(result);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        "Error when get all notifications"
      );
    }
  }

  @Get("/get")
  @ApiResponse({
    status: 200,
    type: [NotificationResponse],
    description: "Successfully",
  })
  async getPatientNotifications(
    @Req() req: Request & { user?: UserGuardModel },
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.getUserByAccountId(
        req.user.accountId
      );
      const notificationList =
        await this.notificationService.getNotificationByUserId(user.id);

      console.log(
        `[P]:::Get notifications by ${
          user.role_id === 3 ? "patient" : "doctor"
        }`,
        user.id
      );

      const notificationResult = notificationList.filter((notification) =>
        user.role_id === 3 ? notification.type === 1 : notification.type === 0
      );

      const result = plainToInstance(NotificationResponse, notificationResult);
      return res.json(result);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        "Error when getting notifications"
      );
    }
  }

  @Post("")
  @ApiResponse({
    status: 201,
    type: Boolean,
    description: "Successfully",
  })
  async createNotification(
    @Req() req: Request & { user?: UserGuardModel },
    @Body() notification: NotificationRequest,
    @Res() res: Response
  ) {
    console.log("[P]:::Create notification data", notification);
    try {
      const user = await this.userService.getUserByAccountId(
        req.user.accountId
      );
      notification.is_seen = false;
      notification.type = user.role_id === 3 ? 1 : 0;

      await this.notificationService.add(notification);
      return res.json({
        message: "Notification added successfully",
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException("Error when post notification");
    }
  }
}
