import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  public equals(object?: Entity<unknown>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (object === this) {
      return true
    }

    if (object.id === this.id) {
      return true
    }

    return false
  }
}
