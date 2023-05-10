import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoutineModule } from './routine/routine.module';
import { RoleModule } from './role/role.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { WorkoutModule } from './workout/workout.module';
import { SessionModule } from './session/session.module';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),  // mandatory for reading .env variables
        AuthModule,
        PrismaModule,
        UserModule,
        RoutineModule,
        RoleModule,
        ExerciseModule,
        WorkoutModule,
        SessionModule,
    ],
    controllers: [WorkoutController],
    providers: [WorkoutService],
})
export class AppModule { }
