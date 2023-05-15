import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ExerciseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    // @IsNotEmpty()
    // @IsString()
    image: string;

    // @IsNotEmpty()
    // @IsString()
    technique: string;

    @IsNotEmpty()
    @IsUUID()
    muscleGroupId: string;
}