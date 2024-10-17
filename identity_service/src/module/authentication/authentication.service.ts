import { Injectable } from '@nestjs/common';
import { PayloadModel } from '../token/dto/payload.model';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './dto/login.request.model';
import { LoginResponse } from './dto/login.response.model';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly tokenService: TokenService) {}
  public async register(): Promise<boolean> {
    const data = true;
    return data;
  }
  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = {
      email: 'test',
      password: 'test',
      account_id: 'sdasd',
    };
    if (
      loginRequest.email == user.email &&
      loginRequest.password == user.password
    ) {
      const payload: PayloadModel = {
        accountId: user.account_id,
      };
      const result: LoginResponse = {
        access_token: this.tokenService.renderToken(payload, '5m'),
        refresh_token: this.tokenService.renderToken(payload, '5m'),
      };
      return result;
    }
    return null;
  }
  refreshToken: () => Promise<string>;
  public async validateToken(token: string) {
    const decoded = this.tokenService.decodeToken(token);
    return decoded ?? null;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  private async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
