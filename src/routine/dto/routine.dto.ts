import { Exercise } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";

export class RoutineDto {

    @IsString()
    title: string;

    @IsUUID()
    @IsString()
    userId: string;
}