import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Inject
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto'
import { JwtGuard } from 'src/auth/guard'
import { EventPattern } from '@nestjs/microservices'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto)
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.ordersService.findAll()
    }

    @UseGuards(JwtGuard)
    @Post(':id')
    cancelOrder(@Param('id') id: string) {
        return this.ordersService.cancelOrder(+id)
    }

    @UseGuards(JwtGuard)
    @Delete('clear')
    clearAllOrders() {
        return this.ordersService.clearAll()
    }

    @UseGuards(JwtGuard)
    @Post('pay/:id')
    async makePayment(@Param('id') id: string) {
        return this.ordersService.makePayment(+id)
    }

    /** Microservice Event Hooks */
    @EventPattern('payment:created')
    paymentCreated(@Body() result: any) {
        this.ordersService.update(result)
    }
}
