import { ProductsRepository } from '@/domain/campaigns/application/repositories/products-repository'
import { Product } from '@/domain/campaigns/enterprise/entities/product'
import { InMemoryCampaignsRepository } from './in-memory-campaigns-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  constructor(private campaignsRepository: InMemoryCampaignsRepository) {}

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async findBySlugAndCompanyId({ slug, companyId }: { slug: string; companyId: string }): Promise<Product | null> {
    const product = this.items.find((product) => product.slug.value === slug)

    if (!product) {
      return null
    }

    const campaign = this.campaignsRepository.items.find((campaign) => {
      return campaign.productId === product.id && campaign.companyId.toString() === companyId
    })

    if (!campaign) {
      return null
    }

    return product
  }

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
