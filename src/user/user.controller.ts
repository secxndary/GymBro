import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        console.log({ user, });
        return user;
    }
}
