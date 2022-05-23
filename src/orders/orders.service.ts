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
        console.log(this.user)
        return await this.prisma.product.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} order`
    }

    remove(id: number) {
        return `This action removes a #${id} order`
    }
}
