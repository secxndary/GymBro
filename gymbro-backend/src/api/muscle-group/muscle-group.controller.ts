import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../../auth/guard';
import { MuscleGroupService } from './muscle-group.service';
import { GetUser } from '../../auth/decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/auth-roles.decorator';


@UseGuards(JwtGuard)
@Controller('muscle-group')
export class MuscleGroupController {

    constructor(private muscleGroupService: MuscleGroupService) { }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('get-all')
    getAllRoutines(@GetUser() user: User) {
        return this.muscleGroupService.getAllMuscleGroups(user);
    }
}
