import {
    IsNotEmpty,
    IsString,
    IsUUID
} from "class-validator";


export class RoutineDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}