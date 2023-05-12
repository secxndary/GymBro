import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {

    @ApiProperty({ example: 'example@gmail.com', description: 'Электронная почта' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'StR0nG_Pa$sWoRD', description: 'Пароль' })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({ example: 'John', description: 'Имя' })
    firstName: string
    
    @ApiProperty({ example: 'Doe', description: 'Фамилия' })
    lastName: string
}