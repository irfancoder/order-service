import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto'
import { UserProvider } from 'src/users/users.provider'
import { User, Order, Product, PaymentStatus } from '@prisma/client'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class OrdersService {
    constructor(
        private readonly userProvider: UserProvider,
        private prisma: PrismaService,
        @Inject('PAYMENT') private readonly paymentClient: ClientProxy
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
            },
            include: {
                products: true
            }
        })

        this.paymentClient.emit<Order>('payment:create', createdOrder)

        return {
            order: createdOrder,
            text: `Successfully created the order. Order ID#${createdOrder.id} `
        }
    }

    async update(order: Order) {
        await this.prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: order.status
            }
        })
    }

    async findAll() {
        return await this.prisma.order.findMany({
            where: {
                userId: this.user.id
            },
            include: {
                products: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async cancelOrder(id: number) {
        const updatedOrders = this.prisma.order
            .update({
                where: {
                    id: id
                },
                data: {
                    status: PaymentStatus.CANCELLED
                }
            })
            .then(async () => {
                return await this.prisma.order.findMany({
                    where: {
                        userId: this.user.id
                    },
                    include: {
                        products: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            })
            .catch((error) => {
                throw new BadRequestException(error)
            })

        return updatedOrders
    }

    async clearAll() {
        await this.prisma.order.deleteMany({
            where: {
                userId: this.user.id
            }
        })
        return this.findAll()
    }

    async makePayment(id: number) {
        const order = await this.prisma.order.findUnique({
            where: {
                id
            },
            include: {
                products: true
            }
        })
        if (!order) throw new ForbiddenException('Invalid order for payment')
        if (order.status !== 'CREATED')
            throw new ForbiddenException('Invalid order for payment')

        return this.paymentClient.emit<Order>('payment:create', order)
    }
}
