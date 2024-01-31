import { Campaign } from '../../enterprise/entities/campaign'

export abstract class CampaignsRepository {
  abstract findById(id: string): Promise<Campaign | null>
  abstract create(campaign: Campaign): Promise<void>
}
