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
    const comparePasswords = this.comparePasswords(
      loginRequest.password,
      user.password,
    );
    if (!comparePasswords) {
      throw new BadRequestException('Password wrong');
    }
    const payload: PayloadModel = {
      accountId: user.id,
    };
    const result: TokensResponseModel = {
      access_token: this.tokenService.renderToken(payload, '15m'),
      refresh_token: this.tokenService.renderToken(payload, '5d'),
    };
    return result;
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
