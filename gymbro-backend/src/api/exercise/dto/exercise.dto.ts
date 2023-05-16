import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ExerciseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsString()
    technique: string;

    @IsNotEmpty()
    @IsUUID()
    muscleGroupId: string;
}