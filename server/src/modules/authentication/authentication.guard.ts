import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserGuardModel } from "./dto/user.guard.model";
import axios from "axios";
require("dotenv").config();

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private tokenCache: {
    [token: string]: { user: UserGuardModel; expiration: number };
  } = {};
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) return false;
    const cachedData = this.tokenCache[token];
    if (cachedData && cachedData.expiration > Date.now()) {
      request.user = cachedData.user; // Gán thông tin user từ cache
      return true;
    }
    try {
        const response = this.decodeToken(token);
   
        const expiredTime = Number(response.exp);
        const accountId = response.account_id;
        const role = Number(response.role);

        const user: UserGuardModel = {
          accountId: accountId,
          role: role,
        };

        this.tokenCache[token] = {
          user: { accountId: accountId, role: role },
          expiration: expiredTime,
        };
        request.user = user;
        return true;
    } catch (e) {
      console.error("invalid token:", e);
      return false;
    }
  }
  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    console.log(request.headers.authorization)
    return authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  }
  private decodeToken (token: string){
    const parts = token.split('$');

      if (parts.length >= 4) {
        const account_id = parts[1]; // Phần chứa account_id
        const exp = parts[2];  // Phần chứa expiredAt
        const role = parts[3]
        return { account_id, exp, role };
    }


    return null;
  }
}
