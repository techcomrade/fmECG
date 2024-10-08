// import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { UserModule } from '../user/user.module';
// import { AuthenController } from './authen.controller';
// // import { AuthenService } from './authen.service';
// import { AuthenMiddleware } from './authen.middlware';
// import { TokenModule } from '../token/token.module';

// @Module({
//     imports: [UserModule, TokenModule],
//     controllers: [AuthenController],
//     // providers: [AuthenService]
// })

// export class AuthenModule implements NestModule{
//     configure(consumer: MiddlewareConsumer) {
//         consumer
//           .apply(AuthenMiddleware)
//           .forRoutes({ path: 'auth/*', method: RequestMethod.ALL });
//     }
// }