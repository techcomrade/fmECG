import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { GroupChatSchema } from "./schema/groupChat.schema";
import { ApiResponse } from "@nestjs/swagger";
import { groupChatRequest } from "./dto/groupChat.request";
import { GroupChatService } from "./groupChat.service";
import { UserGuardModel } from "../authentication/dto/user.guard.model";

@Controller("groupChat")
export class GroupChatController {
  constructor(
    private userService: UserService,
    private groupChatService: GroupChatService,
  ) {}

  @ApiResponse({
    status: 200,
    type: [GroupChatSchema],
    description: "Successful",
  })
  @Get(":id")
  async getGroupChat(
    @Param("id") id: string, 
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    let sender = await this.userService.getUserByAccountId(req.user.accountId);
    console.log("Get group chat by user id:", sender.id);
    return this.groupChatService.getGroupChatByUserId(sender.id);
  }

  @Post("")
  async createGroupChat(
    @Body() groupChatRequest: groupChatRequest,
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    try {
      return await this.groupChatService.saveGroupChat(groupChatRequest);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error when creating group");
    }
  }
}
