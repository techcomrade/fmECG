import {
  Controller,
  Res,
  Post,
  HttpStatus,
  Body,
  NotFoundException,
  Get,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginRequest } from './dto/login.request.model';
import { plainToInstance } from 'class-transformer';
import { LoginResponse } from './dto/login.response.model';

@ApiTags('Authentication Controllers')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}
  @Post('register')
  async register(@Res() res: Response) {
    const user = this.authService.register();
    return res.status(HttpStatus.OK).json(user);
  }
  @Post('login')
  async login(@Body() record: LoginRequest, @Res() res: Response) {
    const loginResult = await this.authService.login(record);
    if (!loginResult) {
      throw new NotFoundException('Login failed');
    }
    const result = plainToInstance(LoginResponse, loginResult);
    return res.status(HttpStatus.OK).json(result);
  }
  @Get('validate-token')
  @ApiBearerAuth() // Chỉ ra rằng API này yêu cầu Bearer token
  async validateToken(
    @Headers('Authorization') authHeader: string,
    @Res() res: Response,
  ) {
    console.log(authHeader);
    if (!authHeader) {
      throw new NotFoundException('No token provided dsfdsf');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new NotFoundException('Invalid token format');
    }
    const result = await this.authService.validateToken(token);
    if (!result) {
      throw new NotFoundException('Invalid token');
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
