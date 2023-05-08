import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3999;
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
}
bootstrap();
