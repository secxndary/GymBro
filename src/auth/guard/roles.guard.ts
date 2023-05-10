import { CanActivate, Injectable } from "@nestjs/common";
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorator/roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            if (bearer != 'Bearer' || !token)
                throw new UnauthorizedException(`You are not authorized`);
            console.log(req.user);
            console.log(req.user.roles.some(role => requiredRoles.include(role.name)));
            return req.user.roles.some(role => requiredRoles.include(role.name));
        }
        catch (err) {
            throw new UnauthorizedException(`You are not authorized`);
        }
    }
}