import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'
import { ProductsModule } from './products/products.module'
@Module({
    imports: [
        UsersModule,
        OrdersModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        ProductsModule
    ],
    controllers: [AppController, ProductsController],
    providers: [AppService, ProductsService]
})
export class AppModule {}
