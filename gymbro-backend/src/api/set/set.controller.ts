import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param
} from '@nestjs/common';
import { User } from '@prisma/client';
import { SetService } from './set.service';
import { GetUser } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';
import { SetDto } from './dto';


@UseGuards(JwtGuard)
@Controller('set')
export class SetController {

    constructor(private setService: SetService) { }


    @Get('get-by-workout/:id')
    async getSetsByWorkout(@GetUser() user: User, @Param('id') id: string) {
        return this.setService.getSetsByWorkout(user, id);
    }


    @Get('/:id')
    async getSetById(@GetUser() user: User, @Param('id') id: string) {
        return this.setService.getSetById(user, id);
    }


    @Post('create')
    async createSet(@GetUser() user: User, @Body() dto: SetDto) {
        return this.setService.createSet(user, dto);
    }
}
