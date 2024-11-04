import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayloadModel } from '../token/dto/payload.model';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './dto/login.request.model';
import { TokensResponseModel } from '../token/dto/tokens.response.model';
import { TokenService } from '../token/token.service';
import { AccountRepository } from './authentication.respository';
import { CreateAccountModel } from './dto/account.create.model';
import { BlacklistService } from '../blacklist/blacklist.service';
import { AccountRegisterModel } from './dto/account.register.model';
import { CreateTokenModel } from '../token/dto/token.create.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly accountRepository: AccountRepository,
    private readonly blacklistService: BlacklistService,
  ) {}
  public async register(accountInfo: AccountRegisterModel) {
    const user = await this.accountRepository.getByEmail(accountInfo.email);
    if (user) {
      throw new BadRequestException('Email is existed');
    }
    const accountData: CreateAccountModel = {
      email: accountInfo.email,
      password: await this.hashPassword(accountInfo.password),
    };
    const addAccount = await this.accountRepository.add(accountData);
    return addAccount;
  }
  public async login(loginRequest: LoginRequest): Promise<TokensResponseModel> {
    const user = await this.accountRepository.getByEmail(loginRequest.email);
    if (!user) {
      throw new NotFoundException('email not founded');
    }
    const blackAccount =
      await this.blacklistService.checkBlacklistAccountByAccountId(user.id);
    if (blackAccount) {
      throw new BadRequestException('This account is blocked');
    }
    const comparePasswords = await this.comparePasswords(
      loginRequest.password,
      user.password,
    );
    if (!comparePasswords) {
      throw new BadRequestException('Password wrong');
    }
    const payload: PayloadModel = {
      accountId: user.id,
    };
    const now = new Date();
    // 15 minute expired
    const expiredTime = new Date(now.getTime() + 15 * 60 * 60 * 1000);
    const result: TokensResponseModel = {
      access_token: this.tokenService.renderToken(payload, '1m'),
      refresh_token: this.tokenService.renderToken(payload, '30d'),
      expired_time: expiredTime,
    };
    const token: CreateTokenModel = {
      account_id: user.id,
      refresh_token: result.refresh_token,
      expiredAt: expiredTime,
    };
    const addToken = this.tokenService.addToken(token);
    if (!addToken) {
      throw new NotFoundException('Saved Token Failed');
    }
    return result;
  }
  public async refreshToken(refresh_token: string) {
    const refreshTokenResult = this.tokenService.refreshToken(refresh_token);
    return refreshTokenResult;
  }
  public async validateToken(token: string) {
    const decoded = this.tokenService.decodeToken(token);
    return decoded ?? null;
  }
  public async logout(token: string) {
    const decoded = this.tokenService.decodeToken(token);
    if (!decoded) return null;
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
