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
import { ExerciseService } from './exercise.service';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../auth/decorator';
import { ExerciseDto } from './dto';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/auth-roles.decorator';


@UseGuards(JwtGuard)
@Controller('exercise')
export class ExerciseController {

    constructor(private exerciseService: ExerciseService) { }


    @Get('get-all')
    getAllExercises() {
        return this.exerciseService.getAllExercises();
    }


    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('create')
    createExercise(
        @Body() dto: ExerciseDto,
        @GetUser() user: User
    ) {
        console.log(dto)
        return this.exerciseService.createExercise(dto, user);
    }


    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Put('update/:id')
    updateExercise(
        @Param('id') id: string,
        // @Body() dto: ExerciseUpdateDto,
        @GetUser() user: User
    ) {
        // return this.exerciseService.updateExercise(id, dto, user);
    }


    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete('delete/:id')
    deleteExercise(
        @Param('id') id: string,
        @GetUser() user: User
    ) {
        return this.exerciseService.deleteExercise(id, user);
    }
}
