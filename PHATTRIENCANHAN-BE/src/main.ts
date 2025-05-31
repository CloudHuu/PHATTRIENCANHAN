import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend on port 3001
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
