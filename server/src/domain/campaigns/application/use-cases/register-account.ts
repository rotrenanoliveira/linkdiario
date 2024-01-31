import { Either, failure, success } from '@/core/either'
import { AccountsRepository } from '../repositories/accounts-repository'
import { Account } from '../../enterprise/entities/account'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

interface RegisterAccountRequest {
  email: string
  fullName: string
}

type RegisterAccountResponse = Either<
  EmailAlreadyInUseError,
  {
    account: Account
  }
>

export class RegisterAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({ email, fullName }: RegisterAccountRequest): Promise<RegisterAccountResponse> {
    const isEmailAlreadyInUse = await this.accountsRepository.findByEmail(email)

    if (isEmailAlreadyInUse) {
      return failure(new EmailAlreadyInUseError())
    }

    const account = Account.create({ email, fullName })

    await this.accountsRepository.create(account)

    return success({ account })
  }
}
