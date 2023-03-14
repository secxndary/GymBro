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
    @IsString()
    @IsNotEmpty()
    userId: string;
}