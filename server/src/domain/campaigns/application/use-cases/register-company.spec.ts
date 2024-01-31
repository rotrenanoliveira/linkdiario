import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { makeAccount } from 'test/factories/make-accounts'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { RegisterCompanyUseCase } from './register-company'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeCompany } from 'test/factories/make-company'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: RegisterCompanyUseCase

describe('Register Company Use Case', () => {
  beforeAll(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    sut = new RegisterCompanyUseCase(inMemoryCompaniesRepository, inMemoryAccountsRepository)
  })

  it('should be able to register a company', async () => {
    const account = makeAccount()
    inMemoryAccountsRepository.items.push(account)

    const result = await sut.execute({
      contactId: account.id.toString(),
      name: 'Company Name',
      description: 'Company Description',
      logoUrl: 'https://example.com/logo.png',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.result).toEqual({
        company: inMemoryCompaniesRepository.items[0],
      })
    }
  })

  it('should not be able to register a company with invalid contact', async () => {
    const result = await sut.execute({
      contactId: 'invalid-contact-id',
      name: 'Company Name',
      description: 'Company Description',
      logoUrl: 'https://example.com/logo.png',
    })

    expect(result.isFailure()).toBe(true)
    if (result.isFailure()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError)
    }
  })

  it('should not be able to register a company with same name/slug', async () => {
    const account = makeAccount()
    inMemoryAccountsRepository.items.push(account)

    const company = makeCompany({
      name: 'Company Name',
      slug: Slug.createFromText('Company Name'),
    })

    inMemoryCompaniesRepository.items.push(company)

    const result = await sut.execute({
      contactId: account.id.toString(),
      name: 'Company Name',
      description: 'Company Description',
      logoUrl: 'https://example.com/logo.png',
    })

    expect(result.isFailure()).toBe(true)
    if (result.isFailure()) {
      expect(result.reason).toBeInstanceOf(CompanyAlreadyExistsError)
    }
  })
})
