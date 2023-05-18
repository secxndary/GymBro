import { IsNotEmpty, IsString } from "class-validator";


export class UserDto {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}