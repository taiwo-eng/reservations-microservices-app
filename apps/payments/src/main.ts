import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { PAYMENTS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../proto/payments.proto'),
      package: PAYMENTS_PACKAGE_NAME,
      url: configService.getOrThrow('PAYMENTS_GRPC_URL'),
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
}
bootstrap();
