import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() auth: AuthDto) {
        return await this.authService.signup(auth)
    }

    @Post('/signin')
    async signin(@Body() auth: AuthDto) {
        return await this.authService.signin(auth)
    }
}
