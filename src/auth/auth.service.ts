import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { v4 as uuidv4 } from 'uuid';
import * as argon from 'argon2';


@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }


    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    id: uuidv4(),
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
            return this.signToken(user.id, user.email);
        }
        catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError)
                if (err.code === 'P2002') {
                    throw new ForbiddenException('Credentials already taken');
                }
            throw err;
        }
    }


    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new ForbiddenException('Non-existent e-mail');

        const passwordMatches = await argon.verify(user.password, dto.password);
        if (!passwordMatches)
            throw new ForbiddenException('Passwords do not match');

        return this.signToken(user.id, user.email);
    }


    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        });

        return { access_token: token, };
    }
}