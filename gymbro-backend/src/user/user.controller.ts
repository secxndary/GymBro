import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MeasurementDto } from './dto';
import { Roles } from '../auth/decorator/auth-roles.decorator';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return this.userService.getMe(user);
    }

    @Roles('ADMIN')
    @Get('all')
    getAllUsers(@GetUser() user: User) {
        return this.userService.getAllUsers(user);
    }

    @Post('measurements')
    addMeasurements(@GetUser() user: User, @Body() dto: MeasurementDto) {
        return this.userService.addMeasurements(user, dto);
    }
}
