import { Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard';
import { WorkoutService } from './workout.service';
import { GetUser } from '../../auth/decorator';
import { User } from '@prisma/client';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/auth-roles.decorator';


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


}
