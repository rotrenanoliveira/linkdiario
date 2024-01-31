import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  name: string
  slug: Slug
  description: string
  catchPhrase: string
  about: string
  price: string
  updatedAt?: Date | null
  // carouselUrl: string[]
  // benefits: Benefits[]
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get catchPhrase() {
    return this.props.catchPhrase
  }

  set catchPhrase(catchPhrase: string) {
    this.props.catchPhrase = catchPhrase
    this.touch()
  }

  get about() {
    return this.props.about
  }

  set about(about: string) {
    this.props.about = about
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(price: string) {
    this.props.price = price
    this.touch()
  }

  // get carouselUrl() {
  //   return this.props.carouselUrl
  // }

  // set carouselUrl(value: string[]) {
  //   this.props.carouselUrl = value
  //   this.touch()
  // }

  // get benefits() {
  //   return this.props.benefits
  // }

  // set benefits(value: Benefits[]) {
  //   this.props.benefits = value
  //   this.touch()
  // }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ProductProps, 'slug'>, id?: UniqueEntityId) {
    return new Product(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
      },
      id,
    )
  }
}
