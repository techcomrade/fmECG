import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: "http://localhost:3001",
    methods: "GET, POST, DELETE",
    credentials: true,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap();
