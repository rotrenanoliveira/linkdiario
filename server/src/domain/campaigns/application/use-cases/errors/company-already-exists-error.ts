import { UseCaseError } from '@/core/errors/use-case-error'

export class CompanyAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Company already exists.')
    this.name = 'CompanyAlreadyExistsError'
  }
}
