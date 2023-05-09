import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class RoleDto {

    @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    @IsString()
    description: string
}