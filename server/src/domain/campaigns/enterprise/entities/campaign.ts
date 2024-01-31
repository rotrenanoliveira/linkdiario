import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type CampaignStatus = 'active' | 'paused' | 'removed' | 'ended'

export interface CampaignProps {
  productId: UniqueEntityId
  companyId: UniqueEntityId
  status: CampaignStatus
  affiliateLink: string
  createdAt: Date
  startedAt: Date
  endedAt?: Date | null
  updatedAt?: Date | null
}

export class Campaign extends Entity<CampaignProps> {
  get productId() {
    return this.props.productId
  }

  get companyId() {
    return this.props.companyId
  }

  get status() {
    return this.props.status
  }

  set status(status: CampaignStatus) {
    this.props.status = status
    this.touch()
  }

  get affiliateLink() {
    return this.props.affiliateLink
  }

  get createdAt() {
    return this.props.createdAt
  }

  get startedAt() {
    return this.props.startedAt
  }

  get endedAt() {
    return this.props.endedAt
  }

  set endedAt(endedAt: Date | undefined | null) {
    if (endedAt === undefined || endedAt === null) {
      return
    }

    this.props.endedAt = endedAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<CampaignProps, 'status' | 'createdAt' | 'startedAt'>, id?: UniqueEntityId) {
    return new Campaign(
      {
        ...props,
        status: props.status ?? 'active',
        createdAt: props.createdAt ?? new Date(),
        startedAt: props.startedAt ?? new Date(),
      },
      id,
    )
  }
}
