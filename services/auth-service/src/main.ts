import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './configs/setup-swagger';
import { ENV } from './common/consts/env.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  if (configService.get<string>(ENV.NODE_ENV)?.toLowerCase() === 'dev') {
    setupSwagger(app);
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({ origin: '*', credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const PORT = configService.get<string>(ENV.PORT) ?? '3000';
  app.listen(PORT, () => console.log(`Auth service started on ${PORT}`));
}
bootstrap();
