import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Company } from '../../enterprise/entities/company'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { AccountsRepository } from '../repositories/accounts-repository'
import { CompaniesRepository } from '../repositories/companies-repository'
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterCompanyUseCaseRequest {
  contactId: string
  name: string
  description: string
  logoUrl: string
}

type RegisterCompanyUseCaseResponse = Either<
  ResourceNotFoundError | CompanyAlreadyExistsError,
  {
    company: Company
  }
>
export class RegisterCompanyUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private accountsRepository: AccountsRepository,
  ) {}

  /**
   * Executes the registration of a company.
   *
   * @param {RegisterCompanyUseCaseRequest} param - object containing contactId, name, description, and logoUrl
   * @return {Promise<RegisterCompanyUseCaseResponse>} the response after registering the company
   */
  async execute({
    contactId,
    name,
    description,
    logoUrl,
  }: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
    // Validate if account exists
    const account = await this.accountsRepository.findById(contactId)
    if (!account) {
      return failure(new ResourceNotFoundError())
    }

    // Validate if company already exists
    const slug = Slug.createFromText(name)

    const isSlugAlreadyInUse = await this.companiesRepository.findBySlug(slug.value)
    if (isSlugAlreadyInUse) {
      return failure(new CompanyAlreadyExistsError())
    }

    // Create company
    const company = Company.create({
      contactId: new UniqueEntityId(contactId),
      name,
      slug,
      description,
      logoUrl,
    })
    // Save company
    await this.companiesRepository.create(company)

    return success({ company })
  }
}
