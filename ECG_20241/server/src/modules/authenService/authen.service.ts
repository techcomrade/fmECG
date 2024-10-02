
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { TokenModel } from '../token/model/token.model';
import { TokenService } from '../token/token.service';
import { AuthenRequest } from './model/dto/authen.request';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ) { }

    async register(user: UserModel): Promise<{ metaData: any }> {

        user.id = uuidv4();
        user.password = await bcrypt.hash(user.password, 10)
        await this.userService.add(user);

        return {
            metaData: {
                message: "Register success",
                user: user,
            }
        }
    }

    async login(authenRequest: AuthenRequest): Promise<TokenModel> {
        const User = await this.userService.findByEmail(authenRequest.email);
        if (!User) {
            throw new NotFoundException("User not found")
        }

        const comparePassword = await bcrypt.compare(authenRequest.password, User.password);
        if (!comparePassword) {
            throw new UnauthorizedException({
                message: "Password or email is incorrect"
            });
        }

        const accessToken = await this.tokenService.renderToken(User, 100);
        const refreshToken = await this.tokenService.renderToken(User, 200);

        const token = TokenModel.build({
            id: uuidv4(),
            user_id: User.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: Date.now()
        })

        await this.tokenService.addToDb(token);
        return token;
    }



    // async refreshToken()
}