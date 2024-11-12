import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import axios from "axios";
import { Reflector } from "@nestjs/core";
require("dotenv").config();

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;

        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractToken(request);
            const response = await axios.post(`${process.env.SSO_URL}/auth/decode`, {
                token: token,
            });
            if (response.data) {
                const user = response.data;
                const role = user.role;
                if (roles.includes(role)) return true;
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    private extractToken(request: any): string | null {
        const authHeader = request.headers.authorization;
        return authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;
    }
}