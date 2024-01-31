export interface BenefitsProps {
  name: string
  description?: string | null
}

export class Benefits {
  public name: string
  public description?: string | null

  private constructor({ name, description }: BenefitsProps) {
    this.name = name
    this.description = description
  }

  static create({ name, description }: BenefitsProps) {
    return new Benefits({ name, description })
  }
}
