import { Injectable } from '@nestjs/common';
import { UserModel } from '../../entities/user.model';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TokenRepository } from './model/token.repository';
import { TokenModel } from '../../entities/token.model';

dotenv.config();

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private tokenRepository: TokenRepository,
    ){}
    
    // async renderToken(user: UserModel, expiredTime: number): Promise<any> {
    //     try{
    //         return this.jwtService.sign({
    //             User_id: user.id,

    //             // role: user.role_id                                                                                                                                                                                            

    //         },{
    //             secret: process.env.JWT_SECRET,
    //             expiresIn: expiredTime
    //         })
    //     }
    //     catch(error){
    //         console.log("token.service.renderToken failed ", error)
    //         return null;
    //     }
    // }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return decoded;
        } catch (error) {
            console.log("token.service.verifyToken failed ")
            return false;
        }
    }

    async addToDb(token: TokenModel){
        try {
            await this.tokenRepository.addToDB(token);
        }
        catch (error) {
            console.log("token.service.addToDb failed ", error);
            return false;
        }
    }
}