import { AuthorizationGuard } from "./modules/common/guards/authorization.guard";
import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
// import { AuthenModule } from "./modules/authenService/authen.module";
import { APP_GUARD } from "@nestjs/core";
import { DeviceModule } from "./modules/device/device.module";
import { AccountModule } from "./modules/account/account.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { RecordModule } from "./modules/record/record.module";
import { ConsultationScheduleModule } from "./modules/consultation_schedule/consultation_schedule.module";
import { AuthModule } from './authentication/auth/auth.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthModuleTsModule } from './authentication/auth.module.ts/auth.module.ts.module';
import { AuthenticationModule } from './authentication/authentication.module';
require("dotenv").config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    UserModule,
    // AuthenModule,
    DeviceModule,
    RecordModule,
    AccountModule,
    ConsultationScheduleModule,
    ScheduleModule,
    AuthModule,
    AuthenticationModule,
    AuthModuleTsModule,
  ],
})
export class AppModule {}
