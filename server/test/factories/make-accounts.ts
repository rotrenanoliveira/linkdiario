import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Account, AccountProps } from '@/domain/campaigns/enterprise/entities/account'
import { faker } from '@faker-js/faker'

export function makeAccount(override: Partial<AccountProps> = {}, id?: UniqueEntityId) {
  const account = Account.create(
    {
      ...override,
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      createdAt: new Date(),
    },
    id,
  )

  return account
}
