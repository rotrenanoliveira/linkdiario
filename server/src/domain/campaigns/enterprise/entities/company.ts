import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'

export interface CompanyProps {
  contactId: UniqueEntityId
  name: string
  slug: Slug
  description: string
  logoUrl: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Company extends Entity<CompanyProps> {
  get contactId() {
    return this.props.contactId
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.props.slug = Slug.createFromText(value)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get logoUrl() {
    return this.props.logoUrl
  }

  set logoUrl(value: string) {
    this.props.logoUrl = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<CompanyProps, 'slug' | 'createdAt'>, id?: UniqueEntityId) {
    return new Company(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
