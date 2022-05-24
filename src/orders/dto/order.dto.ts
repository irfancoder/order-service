import { Type } from 'class-transformer'
import { IsArray, IsNumber } from 'class-validator'

export class CreateOrderDto {
    @Type(() => Number)
    @IsArray()
    @IsNumber({}, { each: true })
    productsId: number[]
}
