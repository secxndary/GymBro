import { Module } from "@nestjs/common/decorators";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { RoleModule } from "../role/role.module";


@Module({
    imports: [PrismaModule, RoleModule, JwtModule.register({
        secret: process.env.JWT_SECRET || 'SECRET'
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }