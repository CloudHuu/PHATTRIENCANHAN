import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // Import express
// import * as multer from 'multer'; // Import multer - Removed

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend on port 3001
  app.enableCors();

  // Configure multer middleware globally - Removed global multer config
  app.use(express.json()); // Ensure JSON body parsing is still enabled
  app.use(express.urlencoded({ extended: true })); // Ensure URL-encoded body parsing is still enabled
  // app.use(multer().any()); // Use multer middleware globally for all file types - Removed

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
