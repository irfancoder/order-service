import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto'

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async create(order: CreateOrderDto) {
        const createdOrder = await this.prisma.order.create({
            data: {
                userId: order.userId,
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

    findAll() {
        return `This action returns all orders`
    }

    findOne(id: number) {
        return `This action returns a #${id} order`
    }

    remove(id: number) {
        return `This action removes a #${id} order`
    }
}
