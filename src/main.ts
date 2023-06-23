import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// require('dotenv').config();

const port = 5000;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app
    .listen(`${port}`)
    .then(() => {
      console.log(`Server is running on port ${port} `);
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
