
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountModel } from '../account/model/account.model';
import { AccountService } from '../account/account.service';
import { TokenModel } from '../token/model/token.model';
import { TokenService } from '../token/token.service';
import { AuthenDTO } from './model/dto/authen.dto';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthenService {
    constructor(
        private accountService: AccountService,
        private tokenService: TokenService
    ) { }

    async register(account: AccountModel): Promise<{ metaData: any }> {
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

    async login(authenDTO: AuthenDTO): Promise<TokenModel> {
        const account = await this.accountService.findByEmail(authenDTO.email);
        console.log(account)
        if (account) {
            const comparePassword = await bcrypt.compare(authenDTO.password, account.password);
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
            account_id: account.id,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: Date.now()
        })

        await this.tokenService.addToDb(token);
        return token;
    }



    // async refreshToken()
}