import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { AuthenticationGuard } from "./modules/authentication/authentication.guard";
import { AuthorizationGuard } from "./modules/authentication/authorization.guard";

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional, can be "JWT" or other formats
      },
      'access-token', // This is the name that you will refer to in @ApiBearerAuth()
    )
    .build();
  app.useGlobalGuards(new AuthenticationGuard());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, host, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap();
