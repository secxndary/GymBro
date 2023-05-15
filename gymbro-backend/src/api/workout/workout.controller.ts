import { Controller, Get, Post, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../../auth/guard';
import { WorkoutService } from './workout.service';
import { GetUser } from '../../auth/decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/auth-roles.decorator';
import { WorkoutDto, WorkoutUpdateDto } from './dto';


@UseGuards(JwtGuard)
@Controller('workout')
export class WorkoutController {

    constructor(private workoutService: WorkoutService) { }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('get-all')
    getAllRoutines() {
        return this.workoutService.getAllWorkouts();
    }

    @Get('get-all-by-user')
    async getWorkouts(@GetUser() user: User) {
        return this.workoutService.getWorkouts(user);
    }

    @Get('/:id')
    async getWorkoutById(@GetUser() user: User, @Param('id') id: string) {
        return this.workoutService.getWorkoutById(user, id);
    }

    @Post('start')
    async startWorkout(@GetUser() user: User, @Body() dto: WorkoutDto) {
        return this.workoutService.startWorkout(user, dto);
    }

    @Put('end')
    async endWorkout(@GetUser() user: User, @Body() dto: WorkoutUpdateDto) {
        return this.workoutService.endWorkout(user, dto);
    }

}
