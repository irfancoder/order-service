import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(private config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }

    async onModuleInit() {
        await this.$connect()
        this.$use(async (params, next) => {
            if (
                ['create', 'update'].includes(params.action) &&
                params.model == 'User'
            ) {
                const user = params.args.data
                const hashedPassword = await hash(user.password)
                user.password = hashedPassword
                params.args.data = user
            }
            return next(params)
        })
    }
}
