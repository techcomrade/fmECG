
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountModel } from '../account/model/account.model';
import { AccountService } from '../account/account.service';
import { UserModel } from '../user/model/user.model';
import { TokenModel } from '../token/model/token.model';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenService {
    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private tokenService: TokenService
    ) { }

    async register(data: any): Promise<{ metaData: any }> {
            const account = AccountModel.build({
                id: uuidv4(),
                email: data.email,
                password: await bcrypt.hash(data.password, 10)
            });

            const user = UserModel.build({
                id: uuidv4(),
                account_id: account.id,
                status: 1,
                username: data.username,
                gender: data.gender,
                phone_number: data.phone_number,
                information: data.information,
                role: data.role,
            });

            await this.accountService.add(account);
            await this.userService.add(user);

            return {
                metaData: {
                    message: "Register success",
                    account: account,
                    user: user
                }
            }
    }

    async login(account: AccountModel): Promise<TokenModel> {
        const profile = await this.accountService.findByEmail(account.email);
        if (profile) {
            const comparePassword = await bcrypt.compare(account.password, profile.password);
            if (!comparePassword) {
                throw new UnauthorizedException({
                    message: "Password or email is incorrect"
                });
            }
        }
        
        const accessToken = await this.tokenService.renderToken(account, 100);
        const refreshToken = await this.tokenService.renderToken(account, 200);

        const token = TokenModel.build({
            id: uuidv4(),
            account_id: profile.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: Date.now()
        })
        await this.tokenService.addToDb(token);
        return token;
    }



    // async refreshToken()
}