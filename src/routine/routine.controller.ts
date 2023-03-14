import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RoutineService } from './routine.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { RoutineDto, RoutineUpdateDto } from './dto';


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

    @Put('update/:id')
    update(
        @Param('id') id: string,
        @Body() dto: RoutineUpdateDto
    ) {
        return this.routineService.update(id, dto);
    }

    @Delete('delete/:id')
    delete(
        @Param('id') id: string,
        @GetUser() user: User
    ) {
        return this.routineService.delete(id, user);
    }
}
