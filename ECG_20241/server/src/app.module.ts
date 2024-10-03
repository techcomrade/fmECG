import { AuthorizationGuard } from './modules/common/guards/authorization.guard';
import { Module} from "@nestjs/common"
import { UserModule } from "./modules/user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthenModule } from "./modules/authenService/authen.module";
import { APP_GUARD } from "@nestjs/core";


@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql', 
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'codung2909.',
            database: 'identity',
            autoLoadModels: true,
            synchronize: true,
          }),
        UserModule,
        AuthenModule
    ],
})

export class AppModule {}