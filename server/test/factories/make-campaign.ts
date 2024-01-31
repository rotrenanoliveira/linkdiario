import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Campaign, CampaignProps } from '@/domain/campaigns/enterprise/entities/campaign'
import { faker } from '@faker-js/faker'

export function makeCampaign(override: Partial<CampaignProps> = {}, id?: UniqueEntityId) {
  const campaign = Campaign.create(
    {
      productId: new UniqueEntityId(),
      companyId: new UniqueEntityId(),
      affiliateLink: faker.internet.url(),
      ...override,
    },
    id,
  )

  return campaign
}
