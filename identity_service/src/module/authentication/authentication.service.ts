import { Injectable } from '@nestjs/common';
import { PayloadModel } from '../token/dto/payload.model';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './dto/login.request.model';
import { TokensResponseModel } from '../token/dto/tokens.response.model';
import { TokenService } from '../token/token.service';
import { AccountRepository } from './authentication.respository';
import { CreateAccountModel } from './dto/account.create.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly accountRepository: AccountRepository,
  ) {}
  public async register() {
    const data: CreateAccountModel = {
      email: 'test',
      password: 'test',
    };
    const addAccount = await this.accountRepository.add(data);
    return addAccount;
  }
  public async login(loginRequest: LoginRequest): Promise<TokensResponseModel> {
    const user = await this.accountRepository.getByEmail(loginRequest.email);
    if (user) {
      const payload: PayloadModel = {
        accountId: user.id,
      };
      const result: TokensResponseModel = {
        access_token: this.tokenService.renderToken(payload, '5m'),
        refresh_token: this.tokenService.renderToken(payload, '5m'),
      };
      return result;
    }
    return null;
  }
  public async refreshToken(
    refresh_token: string,
  ): Promise<TokensResponseModel> {
    const refreshTokenResult = this.tokenService.refreshToken(refresh_token);
    return refreshTokenResult;
  }
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
