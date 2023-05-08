import {
    Controller,
    Get,
    UseGuards,
    Body,
    Post
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MeasurementDto } from './dto';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Post('measurements')
    addMeasurements(@Body() dto: MeasurementDto) {
        return this.userService.addMeasurements(dto);
    }

    @Get('all')
    getAllUsers(@GetUser() user: User) {
        return this.userService.getAllUsers(user);
    }
}
