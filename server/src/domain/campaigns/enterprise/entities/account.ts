import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AccountProps {
  email: string
  fullName: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Account extends Entity<AccountProps> {
  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get fullName() {
    return this.props.fullName
  }

  set fullName(fullName: string) {
    this.props.fullName = fullName
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  /**
   * Create a new account executive with the given properties and optional unique ID.
   *
   * @param {AccountProps} props - the properties for the account executive
   * @param {UniqueEntityId} id - optional unique ID for the account executive
   * @return {Account} the newly created account executive
   */
  static create(props: Optional<AccountProps, 'createdAt'>, id?: UniqueEntityId): Account {
    return new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
