import { CompaniesRepository } from '@/domain/campaigns/application/repositories/companies-repository'
import { Company } from '@/domain/campaigns/enterprise/entities/company'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async findById(id: string): Promise<Company | null> {
    const company = this.items.find((item) => item.id.toString() === id)

    if (!company) {
      return null
    }

    return company
  }

  async findBySlug(slug: string): Promise<Company | null> {
    const company = this.items.find((item) => item.slug.value === slug)

    if (!company) {
      return null
    }

    return company
  }

  async create(company: Company): Promise<void> {
    this.items.push(company)
  }
}
