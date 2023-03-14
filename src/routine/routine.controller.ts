import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { RoutineDto } from './dto';


@UseGuards(JwtGuard)
@Controller('routine')
export class RoutineController {
    constructor(private routineService: RoutineService) { }

    @Get()
    get(@GetUser() user: User) {
        return this.routineService.get(user);
    }

    @Post('create')
    create(
        @Body() dto: RoutineDto,
        @GetUser() user: User
    ) {
        return this.routineService.create(dto, user);
    }
}
