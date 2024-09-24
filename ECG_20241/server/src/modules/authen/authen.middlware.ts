import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthenDTO } from './model/dto/authen.dto';

@Injectable()
export class AuthenMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const registerDTO = await plainToInstance(AuthenDTO, req.body);
            const checkError = await validate(registerDTO);
            if (checkError.length > 0) {
                const error = checkError.map(item => Object.values(item.constraints)).join(". ");
                return res.status(404).json({
                    message: `Invalid register: ${error}`
                })
            }
        }
        catch (err) {
            console.log("authen middleware error ", err);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
        next();
    }
}