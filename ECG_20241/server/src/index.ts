import { NestFactory  } from "@nestjs/core";
import { AppModule } from "./app.module";

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost'

async function bootstrap(){
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`Application is running on: http://${host}:${port}`);
  });
}

bootstrap();