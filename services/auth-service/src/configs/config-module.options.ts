import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
	isGlobal: true,
	validationSchema: Joi.object({
		NODE_ENV: Joi.string().required(),
		PORT: Joi.number(),
		POSTGRES_HOST: Joi.string().required(),
		POSTGRES_PORT: Joi.number().required(),
		POSTGRES_USER: Joi.string().required(),
		POSTGRES_PASSWORD: Joi.string().required(),
		POSTGRES_DB: Joi.string().required(),
		JWT_SECRET: Joi.string().required(),
		JWT_EXPIRATION_TIME: Joi.string().required(),
	}),
	validate: (config) => {
		const { error, value } = configModuleOptions.validationSchema.validate(config, {
			allowUnknown: true,
			abortEarly: false,
		});

		if (error) {
			error.details.forEach((detail) => {
				console.warn(`Config validation error: ${detail.message}`);
			});
			return value;
		}

		return value;
	},
};
