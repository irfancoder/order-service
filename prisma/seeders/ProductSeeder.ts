import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const PRODUCTS = [
    {
        name: 'Product A',
        description: 'Basic',
        price_myr: 2500
    },
    {
        name: 'Product B',
        description: 'Pro',
        price_myr: 3500
    },
    {
        name: 'Product C',
        description: 'Business',
        price_myr: 6000
    }
]

async function main() {
    await prisma.product.createMany({
        data: PRODUCTS
    })

    console.log('[DONE] Product table seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
