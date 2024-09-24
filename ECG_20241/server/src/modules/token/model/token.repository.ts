import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokenModel } from './token.model';


@Injectable()
export class TokenRepository {
    constructor(
      @InjectModel(TokenModel) 
      private tokenModel: typeof TokenModel 
    ){}

    async addToDB(token: TokenModel){
        try {
            return await this.tokenModel.create({
                id: token.id,
                account_id: token.account_id,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                expires_at: token.expires_at
            })
        }
        catch (error){
            console.log("token.repository.addToDB failed", error);
            return false;
        }
    }
}