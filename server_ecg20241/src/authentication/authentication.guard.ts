import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios from 'axios'
@Injectable()
export class AuthenticationGuard implements CanActivate {
  private tokenCache: { [token: string]: { accountId: string; expiration: number } } = {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) return false;
    const cacheData = this.tokenCache[token];
    if(cacheData && cacheData.expiration > Date.now()){
      request.accountId = cacheData.accountId;
      return true;
    }
    try {

    }
    catch (e) {
      console.error('Token verification failed:', e);
      return false;
    }
  }
  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    return authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  }
}
