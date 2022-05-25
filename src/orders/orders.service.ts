import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto'
import { UserProvider } from 'src/users/users.provider'
import { User } from '@prisma/client'

@Injectable()
export class OrdersService {
    constructor(
        private readonly userProvider: UserProvider,
        private prisma: PrismaService
    ) {}

    private get user(): User {
        return this.userProvider.user
    }

    async create(order: CreateOrderDto) {
        const createdOrder = await this.prisma.order.create({
            data: {
                userId: this.user.id,
                products: {
                    connect: order.productsId.map((id) => {
                        return { id: id }
                    })
                }
            }
        })

        return {
            order: createdOrder,
            text: `Successfully created the order. Order ID#${createdOrder.id} `
        }
    }

    async findAll() {
        return await this.prisma.order.findMany({
            where: {
                userId: this.user.id
            },
            include: {
                products: true
            }
        })
    }

    async remove(id: number) {
        return await this.prisma.order.delete({
            where: {
                id: id
            }
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} order`
    }
}
