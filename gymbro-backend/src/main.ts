import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';


async function bootstrap() {
    const ssl = process.env.SSL === 'true' ? true : false;
    const keyPath = process.env.SSL_KEY_PATH || '';
    const certPath = process.env.SSL_CERT_PATH || '';
    let httpsOptions = null;

    if (ssl) {
        httpsOptions = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };
    }

    const app = await NestFactory.create(AppModule, { httpsOptions });
    const PORT = process.env.PORT || 3999;
    const HOSTNAME = process.env.HOSTNAME || 'localhost';

    const config = new DocumentBuilder()
        .setTitle('GymBro')
        .setDescription('Приложение для отслеживания прогресса в тренажерном зале')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    app.enableCors();

    await app.listen(PORT, () => console.log(`\n[OK] Server running at http${ssl ? 's' : ''}://${HOSTNAME}:${PORT}/`));
}
bootstrap();
