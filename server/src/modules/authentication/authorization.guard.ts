import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!user) return false; 

    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) return true; 

    return roles.includes(user.role);
  }
}
