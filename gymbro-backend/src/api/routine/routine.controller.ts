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
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../auth/decorator';
import { RoutineDto, RoutineUpdateDto } from './dto';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/auth-roles.decorator';


@UseGuards(JwtGuard)
@Controller('routine')
export class RoutineController {

    constructor(private routineService: RoutineService) { }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('get-all')
    getAllRoutines() {
        return this.routineService.getAllRoutines();
    }

    @Get('get-all-by-user')
    getRoutines(@GetUser() user: User) {
        return this.routineService.getRoutines(user);
    }

    @Post('create')
    createRoutine(
        @Body() dto: RoutineDto,
        @GetUser() user: User
    ) {
        return this.routineService.createRoutine(dto, user);
    }

    @Put('update/:id')
    updateRoutine(
        @Param('id') id: string,
        @Body() dto: RoutineUpdateDto,
        @GetUser() user: User
    ) {
        return this.routineService.updateRoutine(id, dto, user);
    }

    @Delete('delete/:id')
    deleteRoutine(
        @Param('id') id: string,
        @GetUser() user: User
    ) {
        return this.routineService.deleteRoutine(id, user);
    }
}
