import { User } from '@prisma/client'
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator
} from 'class-validator'
import { PrismaService } from 'src/prisma/prisma.service'

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) {}

    validate(value: any, args: ValidationArguments) {
        console.log(value, 'value')
        console.log(args, 'args')
        // const user = this.prisma.user.findUnique({
        //     where: {
        //         [model]: property
        //     }
        // })

        // if (user) return false
        return true
    }
}

export function IsUnique(
    property: User,
    model?: any,
    validationOptions?: ValidationOptions
) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property, model],
            validator: IsUniqueConstraint
        })
    }
}
