import { Module } from "@nestjs/common/decorators";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { RoleService } from "../role/role.service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";


@Module({
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RoleService]
})
export class AuthModule { }