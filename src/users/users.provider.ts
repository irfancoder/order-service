import { Injectable, Scope, Inject } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { User } from '@prisma/client'

@Injectable({ scope: Scope.REQUEST })
export class UserProvider {
    constructor(@Inject(REQUEST) private readonly request) {}

    get user(): User {
        return this.request.user
    }
}
