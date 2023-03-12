import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        AuthModule,
        PrismaModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true })    // mandatory for reading .env variables
    ],
})
export class AppModule { }
