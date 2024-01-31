import { faker } from '@faker-js/faker'
import { validateTextLength } from './text-length'

test('Testing text length', () => {
  expect(validateTextLength('')).toBe(false)
  expect(validateTextLength(faker.lorem.words(1), 1)).toBe(true)
  expect(validateTextLength(faker.lorem.words(12), 10)).toBe(false)

  const longText = faker.lorem.text()
  const isTextTooLong = longText.length > 144

  expect(validateTextLength(longText, undefined, 144)).toBe(!isTextTooLong)
})
