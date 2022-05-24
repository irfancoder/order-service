import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.product.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} order`
    }

    remove(id: number) {
        return `This action removes a #${id} order`
    }
}
