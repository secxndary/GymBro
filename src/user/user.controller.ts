import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/decorator/user.decorator';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@User() user: Request) {
        console.log({
            user: user
        });
        return user;
    }
}
