import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
      package: NOTIFICATIONS_PACKAGE_NAME,
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
}
bootstrap();
