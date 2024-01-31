import { Product } from '../../enterprise/entities/product'

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findBySlugAndCompanyId({ slug, companyId }: { slug: string; companyId: string }): Promise<Product | null>
  abstract create(product: Product): Promise<void>
}
