import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // Import express
// import * as multer from 'multer'; // Import multer - Removed
import { join } from 'path'; // Import join from path

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend on port 3001
  app.enableCors();

  // Configure middleware to serve static files from the 'uploads' directory
  // Files in './uploads' will be accessible under the '/uploads' URL path
  app.use('/uploads', express.static(join(__dirname, '..' , 'uploads')));

  // Configure multer middleware globally - Removed global multer config
  app.use(express.json()); // Ensure JSON body parsing is still enabled
  app.use(express.urlencoded({ extended: true })); // Ensure URL-encoded body parsing is still enabled
  // app.use(multer().any()); // Use multer middleware globally for all file types - Removed

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
