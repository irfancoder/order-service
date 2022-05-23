import { Test, TestingModule } from '@nestjs/testing'
import { UserProvider } from '../users.provider'

describe('UserProvider', () => {
    let provider: UserProvider

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserProvider]
        }).compile()

        provider = module.get<UserProvider>(UserProvider)
    })

    it('should be defined', () => {
        expect(provider).toBeDefined()
    })
})
