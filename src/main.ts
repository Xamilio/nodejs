import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const PORT: number = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? PORT, () => {
    console.log(`Server has been http://localhost:${PORT}`);
  });
}
await bootstrap();
