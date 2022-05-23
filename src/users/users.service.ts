import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { AuthDto } from 'src/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(authDto: AuthDto): Promise<User | undefined> {
        try {
            return this.prisma.user.create({
                data: authDto
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw error
            }

            throw error
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}
