export class CampaignAlreadyExistsError extends Error {
  constructor() {
    super('Campaign already exists.')
    this.name = 'CampaignAlreadyExistsError'
  }
}
