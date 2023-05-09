import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';
import { RoleModule } from './role/role.module';


@Module({
    imports: [
        AuthModule,
        PrismaModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),  // mandatory for reading .env variables
        RoutineModule, RoleModule
    ],
})
export class AppModule { }
