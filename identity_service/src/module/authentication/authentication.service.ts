import { Injectable } from '@nestjs/common';
import { IAuthenticationService } from './interface/authentication.service.interface';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  public async userRegister(): Promise<boolean> {
    const data = true;
    return data;
  }
  userLogin: () => Promise<string>;
  refreshToken: () => Promise<string>;
  validateToken: () => Promise<string>;
}
