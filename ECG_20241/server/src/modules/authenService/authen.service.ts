
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../../entities/user.model';
import { UserService } from '../user/user.service';
import { TokenModel } from '../../entities/token.model';
import { TokenService } from '../token/token.service';
import { AccountRequest } from '../account/dto/account.request';
import { AccountService } from '../account/account.service';
import { AuthenRequest } from './dto/authen.request';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenService {
    constructor(
        private accountService: AccountService,
        private tokenService: TokenService
    ) { }

    async register(account: AccountRequest): Promise<{ metaData: any }> {

        account.id = uuidv4();
        account.password = await bcrypt.hash(account.password, 10)
        await this.accountService.add(account);

        return {
            metaData: {
                message: "Register success",
                account: account,
            }
        }
    }

    // async login(authenRequest: AuthenRequest) {
    //     const account = await this.accountService.findByEmail(authenRequest.email);
    //     if (!account) {
    //         throw new NotFoundException("Account not found")
    //     }

    //     const comparePassword = await bcrypt.compare(authenRequest.password, account.);
    //     if (!comparePassword) {
    //         throw new UnauthorizedException({
    //             message: "Password or email is incorrect"
    //         });
    //     }

    //     const accessToken = await this.tokenService.renderToken(User, 100);
    //     const refreshToken = await this.tokenService.renderToken(User, 200);

    //     const token = TokenModel.build({
    //         id: uuidv4(),
    //         user_id: User.id,
    //         access_token: accessToken,
    //         refresh_token: refreshToken,
    //         expires_at: Date.now()
    //     })

    //     await this.tokenService.addToDb(token);
    //     return token;
    // }
}