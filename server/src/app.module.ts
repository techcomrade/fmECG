import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { APP_GUARD } from "@nestjs/core";
import { DeviceModule } from "./modules/device/device.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { RecordModule } from "./modules/record/record.module";
import { ConsultationScheduleModule } from "./modules/consultation_schedule/consultation_schedule.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { StatisticModule } from "./modules/statistic/statistic.module";
import { ChatModule } from "./modules/chat/chat.module";
import { GroupChatModule } from './modules/groupChat/groupChat.module';
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
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    DeviceModule,
    RecordModule,
    ConsultationScheduleModule,
    ScheduleModule,
    NotificationModule,
    StatisticModule,
    ChatModule,
    GroupChatModule
  ],
})
export class AppModule {}
