import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService: ConfigService = app.get(ConfigService);

  // if (configService.get(ENV.NODE_ENV) !== 'prod') {
  //   setupSwagger(app);
  // }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({ origin: `*`, credentials: true });
  app.listen(configService.get(`PORT`) ?? 3000, () =>
    console.log(`Auth service started on ${configService.get(`PORT`)}`),
  );
}
bootstrap();
