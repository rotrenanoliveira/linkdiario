import { Either, failure, success } from '@/core/either'
import { Campaign } from '../../enterprise/entities/campaign'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { CampaignsRepository } from '../repositories/campaigns-repository'
import { ProductsRepository } from '../repositories/products-repository'
import { CampaignAlreadyExistsError } from './errors/campaign-already-exists-error'
import { Product } from '../../enterprise/entities/product'
import { CompaniesRepository } from '../repositories/companies-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface ProductDataRequest {
  name: string
  description: string
  catchPhrase: string
  about: string
  price: string
}

interface CreateCampaignRequest {
  companyId: string
  affiliateLink: string
  product: ProductDataRequest
  startedAt?: Date
  endedAt?: Date
}

type CreateCampaignResponse = Either<CampaignAlreadyExistsError | ResourceNotFoundError, { campaign: Campaign }>

export class CreateCampaignUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private campaignsRepository: CampaignsRepository,
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute({
    companyId,
    affiliateLink,
    product: productData,
    startedAt,
    endedAt,
  }: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    // Validate if company exists
    const companyExists = await this.companiesRepository.findById(companyId)
    if (!companyExists) {
      return failure(new ResourceNotFoundError())
    }

    const productSlug = Slug.createFromText(productData.name)
    // Validate if product already exists for this company
    const productExists = await this.productsRepository.findBySlugAndCompanyId({
      companyId,
      slug: productSlug.value,
    })

    if (productExists) {
      return failure(new CampaignAlreadyExistsError())
    }

    // Destructure productData
    const { name, description, catchPhrase, about, price } = productData
    // Create product
    const product = Product.create({
      name,
      about,
      price,
      description,
      catchPhrase,
      slug: productSlug,
    })

    // Create campaign
    const campaign = Campaign.create({
      companyId: new UniqueEntityId(companyId),
      productId: product.id,
      affiliateLink,
      startedAt,
      endedAt,
    })

    // Save product and campaign
    await Promise.all([this.productsRepository.create(product), this.campaignsRepository.create(campaign)])

    return success({ campaign })
  }
}
