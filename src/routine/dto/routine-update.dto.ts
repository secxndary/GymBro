import {
    IsNotEmpty,
    IsString
} from "class-validator";


export class RoutineUpdateDto {

    @IsString()
    @IsNotEmpty()
    title: string;
}