import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { UsersService } from 'src/users/users.service'
import { JwtStrategy } from './strategy'

@Module({
    providers: [AuthService, UsersService, JwtStrategy],
    imports: [JwtModule.register({})],
    controllers: [AuthController]
})
export class AuthModule {}
