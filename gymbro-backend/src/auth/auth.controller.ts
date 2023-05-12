import {
    Post,
    Body,
    Controller,
    HttpCode,
    HttpStatus
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, RegisterDto } from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 201, type: Object })
    @Post('signup')
    signup(@Body() dto: RegisterDto) {
        return this.authService.signup(dto);
    }

    @ApiOperation({ summary: 'Вход в аккаунт пользователя' })
    @ApiResponse({ status: 200, type: Object })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}
