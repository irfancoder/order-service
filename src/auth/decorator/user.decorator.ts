import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// No longer used. Replaced with request-scope DI
export const _User = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()

        if (data) return request.user[data]
        return request.user
    }
)
