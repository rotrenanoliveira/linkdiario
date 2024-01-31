import { Company } from '../../enterprise/entities/company'

export abstract class CompaniesRepository {
  abstract findBySlug(slug: string): Promise<Company | null>
  abstract create(company: Company): Promise<void>
}
