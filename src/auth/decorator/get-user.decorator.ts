import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer != 'Bearer' || !token)
                throw new UnauthorizedException(`You are not authorized`);
            if (data)
                return req.user[data];
            return req.user;
        }
        catch (err) {
            throw new UnauthorizedException(`You are not authorized`);
        }
    }
);