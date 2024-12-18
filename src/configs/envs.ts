import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;
  NATS_SERVERS: string[];
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  ORDERS_MS_HOST: envVars.ORDERS_MS_HOST,
  ORDERS_MS_PORT: envVars.ORDERS_MS_PORT,
  NATS_SERVERS: envVars.NATS_SERVERS,
};
