import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { RegisterAccountUseCase } from './register-account'
import { makeAccount } from 'test/factories/make-accounts'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: RegisterAccountUseCase

describe('Register Account Use Case', () => {
  beforeAll(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    sut = new RegisterAccountUseCase(inMemoryAccountsRepository)
  })

  it('Should be able to register an account', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      fullName: 'John Doe',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.result).toEqual({
        account: inMemoryAccountsRepository.items[0],
      })
    }
  })

  it('Should not be able to register an account with an email already in use', async () => {
    const account = makeAccount({
      email: 'johndoe@example.com',
    })

    inMemoryAccountsRepository.items.push(account)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      fullName: 'John Doe',
    })

    expect(result.isFailure()).toBe(true)
    if (result.isFailure()) {
      expect(result.reason).toEqual(new EmailAlreadyInUseError())
    }
  })
})
