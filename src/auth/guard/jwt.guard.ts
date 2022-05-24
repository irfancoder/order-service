import { UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }

    handleRequest(err: any, user: any, info) {
        if (err || !user) {
            throw err || new UnauthorizedException()
        }

        return user
    }
}
