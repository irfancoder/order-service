import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        const user = await this.userService.createUser(dto)

        return await this.signToken(user.id, user.email)
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException('User does not exist')

        const pwMatches = await verify(user.password, dto.password)

        if (!pwMatches)
            throw new ForbiddenException('Wrong username / password')

        return await this.signToken(user.id, user.email)
    }

    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string; redirect: string | undefined }> {
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            access_token: token,
            redirect: '/'
        }
    }
}
