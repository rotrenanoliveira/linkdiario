import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product, ProductProps } from '@/domain/campaigns/enterprise/entities/product'
import { faker } from '@faker-js/faker'

export function makeProduct(override: Partial<ProductProps> = {}, id?: UniqueEntityId) {
  const product = Product.create(
    {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      catchPhrase: faker.commerce.productName(),
      about: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      ...override,
    },
    id,
  )

  return product
}
