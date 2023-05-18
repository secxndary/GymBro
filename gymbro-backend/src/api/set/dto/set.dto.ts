import { IsNotEmpty, IsUUID } from "class-validator";


export class SetDto {

    @IsNotEmpty()
    @IsUUID()
    exercideId: string;

    @IsNotEmpty()
    @IsUUID()
    workoutId: string;
}