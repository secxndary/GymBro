import { Module } from "@nestjs/common/decorators";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { RoleModule } from "../api/role/role.module";
import { UserModule } from "../api/user/user.module";
import { UserService } from "../api/user/user.service";


@Module({
    imports: [
        PrismaModule,
        RoleModule,
        UserModule,
        JwtModule.register({ secret: process.env.JWT_SECRET || 'SECRET' })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService]
})
export class AuthModule { }