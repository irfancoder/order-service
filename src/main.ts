import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    )

    app.connectMicroservice({
        name: 'GATEWAY',
        transport: Transport.TCP,
        options: {
            port: 3003
        }
    })

    app.enableCors()
    await app.startAllMicroservices()
    await app.listen(3000)
}
bootstrap()
