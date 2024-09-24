import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { AuthenMiddleware } from './authen.middlware';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [AccountModule, UserModule, TokenModule],
    controllers: [AuthenController],
    providers: [AuthenService]
})

export class AuthenModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthenMiddleware)
          .forRoutes({ path: 'auth/*', method: RequestMethod.ALL });
    }
}