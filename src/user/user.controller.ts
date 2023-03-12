import { Controller, Get, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        console.log({
            user: req.user
        });
        return req.user;
    }
}
