import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { UserProvider } from 'src/users/users.provider'
import { ClientsModule } from '@nestjs/microservices'
import { SERVICES } from 'src/app.microservices'

@Module({
    imports: [ClientsModule.register([SERVICES.PAYMENT])],
    controllers: [OrdersController],
    providers: [OrdersService, UserProvider]
})
export class OrdersModule {}
