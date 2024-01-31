import { AccountsRepository } from '@/domain/campaigns/application/repositories/accounts-repository'
import { Account } from '@/domain/campaigns/enterprise/entities/account'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async findById(id: string): Promise<Account | null> {
    const account = this.items.find((item) => item.id.toString() === id)

    if (!account) {
      return null
    }

    return account
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this.items.find((item) => item.email === email)

    if (!account) {
      return null
    }

    return account
  }

  async create(account: Account): Promise<void> {
    this.items.push(account)
  }
}
