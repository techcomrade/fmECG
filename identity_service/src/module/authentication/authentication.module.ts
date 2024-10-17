import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TokenModule } from '../token/token.module';
import { AccountRepository } from './authentication.respository';

@Module({
  imports: [TokenModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccountRepository],
})
export class AuthenticationModule {}
