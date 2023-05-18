import { IsInt, IsNotEmpty, IsUUID } from "class-validator";


export class SetDto {

    @IsNotEmpty()
    @IsUUID()
    exerciseId: string;

    @IsNotEmpty()
    @IsUUID()
    workoutId: string;

    @IsNotEmpty()
    @IsInt()
    elapsedSeconds: number;
}