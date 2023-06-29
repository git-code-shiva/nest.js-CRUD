import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import * as path from 'path';
// import * as express from 'express';
// import * as history from 'connect-history-api-fallback';
require('dotenv').config();

const port = 5000;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // // Serve static files
  // app.use(
  //   express.static(
  //     path.join(__dirname, '..', 'G:/nest_js_practice/frontendsrc'),
  //   ),
  // );
  // Fallback routing
  // app.use(history());
  app.enableCors();

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
