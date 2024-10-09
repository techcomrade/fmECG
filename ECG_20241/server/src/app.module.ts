import { AuthorizationGuard } from "./modules/common/guards/authorization.guard";
import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
// import { AuthenModule } from "./modules/authenService/authen.module";
import { APP_GUARD } from "@nestjs/core";
import { DeviceModule } from "./modules/device/device.module";
import { AccountModule } from "./modules/account/account.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "duong1705",
      database: "identity",
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    UserModule,
    // AuthenModule,
    DeviceModule,
    AccountModule
  ],
})
export class AppModule {}
