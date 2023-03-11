import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    roleId: 1
                },
                select: {
                    id: true,
                    email: true,
                    roleId: true
                },
            });
            return user;
        }
        catch (err) {
            // if (err instanceof PrismaClientKnownRequestError)
            // if (err.code === 'P2002')
            throw new ForbiddenException('Credentials already taken');
            // throw err;
        }
    }


    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new ForbiddenException('Non-existent e-mail');

        const passwordMatches = await argon.verify(user.password, dto.password);
        if (!passwordMatches)
            throw new ForbiddenException('Passwords do not match');

        delete user.password;
        return user;
    }
}