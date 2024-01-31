import { UseCaseError } from '@/core/errors/use-case-error'

export class EmailAlreadyInUseError extends Error implements UseCaseError {
  constructor() {
    super('Email already in use.')
    this.name = 'EmailAlreadyInUseError'
  }
}
