import { UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }

    handleRequest(err: any, user: any, info) {
        console.log(err)
        console.log(user)
        console.log(info)
        if (err || !user) {
            throw err || new UnauthorizedException()
        }

        return user
    }
}
