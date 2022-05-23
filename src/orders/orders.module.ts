import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { UserProvider } from 'src/users/users.provider'

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, UserProvider]
})
export class OrdersModule {}
