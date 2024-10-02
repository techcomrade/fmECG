import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: TokenService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean | any> {
        console.log(1)
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if(!token) throw new UnauthorizedException('Invalid access');

        try {
            const payload = await this.tokenService.verifyToken(token);
            if (!payload) throw new Error;
            request['user'] = payload;
        }
        catch(error){
            throw new UnauthorizedException('Cannot activate')
        }

        return true;
    }

    private extractTokenFromRequest(request: Request): string | undefined {
        const authorizationHeader = request.headers['authorization'];
        if(!authorizationHeader){
            throw new UnauthorizedException('Invalid access')
        }
        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}