import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateOrderDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    userId: number

    @Type(() => Number)
    @IsArray()
    @IsNumber({}, { each: true })
    productsId: number[]
}
