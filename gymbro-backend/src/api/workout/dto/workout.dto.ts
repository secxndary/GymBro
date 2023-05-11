import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class WorkoutDto {

    @IsDate()
    @IsNotEmpty()
    timeStart: Date;

    @IsDate()
    timeEnd: Date;

    @IsString()
    notes: string;

    @IsString()
    photo: string;
}