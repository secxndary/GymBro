import { IsEmpty, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ExerciseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmpty()
    // @IsNotEmpty()
    image: string;

    @IsString()
    technique: string;

    @IsNotEmpty()
    @IsUUID()
    muscleGroupId: string;
}