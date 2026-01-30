import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Auth service started on ${process.env.PORT ?? 3000} - env.${process.env.ENV ?? 'dev'}`)
  });
}
bootstrap();
