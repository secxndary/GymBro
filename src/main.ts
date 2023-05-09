import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3999;
    const config = new DocumentBuilder()
        .setTitle('GymBro')
        .setDescription('Приложение для отслеживания прогресса в тренажерном зале')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
}
bootstrap();
