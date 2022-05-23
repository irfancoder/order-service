import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto'
import { JwtGuard } from 'src/auth/guard'

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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id)
    }
}
