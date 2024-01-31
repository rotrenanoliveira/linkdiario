import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies-repository'
import { CreateCampaignUseCase } from './create-campaign'
import { InMemoryCampaignsRepository } from 'test/repositories/in-memory-campaigns-repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { makeCompany } from 'test/factories/make-company'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeProduct } from 'test/factories/make-product'
import { makeCampaign } from 'test/factories/make-campaign'
import { CampaignAlreadyExistsError } from './errors/campaign-already-exists-error'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let inMemoryCampaignsRepository: InMemoryCampaignsRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateCampaignUseCase

describe('Create Campaign Use Case', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    inMemoryCampaignsRepository = new InMemoryCampaignsRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(inMemoryCampaignsRepository)
    sut = new CreateCampaignUseCase(
      inMemoryProductsRepository,
      inMemoryCampaignsRepository,
      inMemoryCompaniesRepository,
    )
  })

  it('should be able to create a campaign', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.items.push(company)

    const result = await sut.execute({
      companyId: company.id.toString(),
      affiliateLink: 'example.com',
      product: {
        name: 'Product Name',
        description: 'Product Description',
        catchPhrase: 'Product Catch Phrase',
        about: 'Product About',
        price: 'R$ 100',
      },
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.result).toEqual({ campaign: inMemoryCampaignsRepository.items[0] })
    }
  })

  it('should be able to create a campaign with start and end dates', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.items.push(company)

    const startedAt = new Date('2024-02-01')
    const endedAt = new Date('2024-03-01')

    const result = await sut.execute({
      companyId: company.id.toString(),
      affiliateLink: 'example.com',
      product: {
        name: 'Product Name',
        description: 'Product Description',
        catchPhrase: 'Product Catch Phrase',
        about: 'Product About',
        price: 'R$ 100',
      },
      startedAt,
      endedAt,
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryCampaignsRepository.items[0].startedAt).toEqual(startedAt)
    expect(inMemoryCampaignsRepository.items[0].endedAt).toEqual(endedAt)
  })

  it('should not be able to create a campaign with invalid company', async () => {
    const result = await sut.execute({
      companyId: 'invalid-company-id',
      affiliateLink: 'example.com',
      product: {
        name: 'Product Name',
        description: 'Product Description',
        catchPhrase: 'Product Catch Phrase',
        about: 'Product About',
        price: 'R$ 100',
      },
    })

    expect(result.isFailure()).toBe(true)
    if (result.isFailure()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError)
    }
  })

  it('should not be able to create a campaign with same slug for the same company', async () => {
    const company = makeCompany()

    const product = makeProduct({
      name: 'this is a product name',
    })

    const campaign = makeCampaign({
      productId: product.id,
      companyId: company.id,
    })

    inMemoryCompaniesRepository.items.push(company)
    inMemoryProductsRepository.items.push(product)
    inMemoryCampaignsRepository.items.push(campaign)

    const result = await sut.execute({
      companyId: company.id.toString(),
      affiliateLink: 'example.com',
      product: {
        name: 'this is a product name',
        description: 'Product Description',
        catchPhrase: 'Product Catch Phrase',
        about: 'Product About',
        price: 'R$ 100',
      },
    })

    expect(result.isFailure()).toBe(true)
    if (result.isFailure()) {
      expect(result.reason).toBeInstanceOf(CampaignAlreadyExistsError)
    }
  })
})
