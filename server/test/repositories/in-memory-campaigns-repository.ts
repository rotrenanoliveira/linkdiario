import { CampaignsRepository } from '@/domain/campaigns/application/repositories/campaigns-repository'
import { Campaign } from '@/domain/campaigns/enterprise/entities/campaign'

export class InMemoryCampaignsRepository implements CampaignsRepository {
  public items: Campaign[] = []

  async findById(id: string): Promise<Campaign | null> {
    const campaign = this.items.find((item) => item.id.toString() === id)

    if (!campaign) {
      return null
    }

    return campaign
  }

  async create(campaign: Campaign): Promise<void> {
    this.items.push(campaign)
  }
}
