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
    ScheduleModule,
  ],
})
export class AppModule {}
