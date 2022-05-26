import {
    ClientProviderOptions,
    ClientsModuleOptions,
    Transport
} from '@nestjs/microservices'

/**
 * Add microservices here as needed.
 */

const SERVICES: Record<string, ClientProviderOptions> = {
    PAYMENT: {
        name: 'PAYMENT',
        transport: Transport.TCP,
        options: {
            port: 3002
        }
    },
    GATEWAY: {
        name: 'GATEWAY',
        transport: Transport.TCP,
        options: {
            port: 3003
        }
    }
}

export { SERVICES as SERVICES }

export const SERVICES_ALL = Object.values(SERVICES) as ClientsModuleOptions
