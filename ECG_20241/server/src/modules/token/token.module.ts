import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { TokenRepository } from "./model/token.repository";
import { TokenModel } from "../../entities/token.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([TokenModel])],
  providers: [TokenService, JwtService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
