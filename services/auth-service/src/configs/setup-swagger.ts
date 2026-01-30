import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
	SwaggerModule.setup(
		'api',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setTitle('API Парсера')
				.setDescription('Документация API Парсера')
				.setVersion('1.0')
				.addBearerAuth()
				.addSecurityRequirements('bearer')
				.build(),
		),
	);
}
