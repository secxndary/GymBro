import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common";
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/roles-auth.decorator";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            if (bearer != 'Bearer' || !token)
                throw new UnauthorizedException(`You are not authorized`);
            const user = await this.prisma.user.findUnique({
                where: { email: req.user.email },
                include: { role: true }
            }).then(user => { return user });
            // console.log(req.user);
            // console.log({ user });
            // console.log(user.role.name);
            // console.log(requiredRoles.includes(user.role.name));
            return requiredRoles.includes(user.role.name);
        }
        catch (err) {
            console.log(err);
            throw new ForbiddenException(`You don't have access to this resource`);
        }
    }
}