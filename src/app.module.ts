import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PAYMENT',
                transport: Transport.TCP
            }
        ]),
        UsersModule,
        OrdersModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
