import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Company, CompanyProps } from '@/domain/campaigns/enterprise/entities/company'
import { Slug } from '@/domain/campaigns/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeCompany(override: Partial<CompanyProps> = {}, id?: UniqueEntityId) {
  const name = override.name ?? faker.company.name()

  const company = Company.create(
    {
      contactId: new UniqueEntityId(),
      name,
      slug: Slug.createFromText(name),
      description: faker.company.catchPhrase(),
      logoUrl: faker.internet.url(),
      ...override,
    },
    id,
  )

  return company
}
