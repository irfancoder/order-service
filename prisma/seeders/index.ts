// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// const PRODUCTS = [
//     {
//         id: 1,
//         name: 'Product A',
//         price: 2500
//     },
//     {
//         id: 2,
//         name: 'Product B',
//         price: 3500
//     },
//     {
//         id: 3,
//         name: 'Product C',
//         price: 6000
//     }
// ]

// async function main() {
//     const alice = await prisma.user.upsert({
//         where: { email: 'alice@prisma.io' },
//         update: {},
//         create: {
//             email: 'alice@prisma.io',
//             name: 'Alice',
//             posts: {
//                 create: {
//                     title: 'Check out Prisma with Next.js',
//                     content: 'https://www.prisma.io/nextjs',
//                     published: true
//                 }
//             }
//         }
//     })

//     const bob = await prisma.user.upsert({
//         where: { email: 'bob@prisma.io' },
//         update: {},
//         create: {
//             email: 'bob@prisma.io',
//             name: 'Bob',
//             posts: {
//                 create: [
//                     {
//                         title: 'Follow Prisma on Twitter',
//                         content: 'https://twitter.com/prisma',
//                         published: true
//                     },
//                     {
//                         title: 'Follow Nexus on Twitter',
//                         content: 'https://twitter.com/nexusgql',
//                         published: true
//                     }
//                 ]
//             }
//         }
//     })
//     console.log({ alice, bob })
// }

// main()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
