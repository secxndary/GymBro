import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";


export class MeasurementDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    weight: number;

    @IsNumber()
    height: number;

    @IsNumber()
    chest: number;

    @IsNumber()
    neck: number;

    @IsNumber()
    shoulders: number;

    @IsNumber()
    leftBicep: number;

    @IsNumber()
    rightBicep: number;

    @IsNumber()
    leftForearm: number;

    @IsNumber()
    rightForearm: number;

    @IsNumber()
    waist: number;

    @IsNumber()
    thighs: number;

    @IsNumber()
    calves: number;
}