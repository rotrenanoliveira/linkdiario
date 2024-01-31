/**
 * Validates the length of the input text based on the maximum number of words allowed.
 *
 * @param {string} text - the input text to be validated
 * @param {number} maxWords - the maximum number of words allowed
 * @return {boolean} true if the text has equal to or more than the maximum number of words allowed, false otherwise
 */
export function validateTextLength(text: string, maxWords?: number, maxCharacters?: number): boolean {
  if (!text || text.length === 0 || text.length === 1) {
    return false
  }

  // eslint-disable-next-line prettier/prettier
  const commonWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'yet', 'so', 'for', 'nor', 'as', 'at', 'by','in', 'of', 'on', 'per', 'to',])
  // eslint-disable-next-line prettier/prettier
  const commonWordsPortuguese = new Set(['um', 'uma', 'uns', 'umas', 'o', 'a', 'os', 'as', 'e', 'mas', 'ou', 'ainda', 'então', 'por', 'nem', 'como', 'em', 'no', 'na', 'nos', 'nas', 'de', 'do', 'da', 'dos', 'das', 'por', 'per', 'para',]);

  const allCommonWords = new Set([...commonWords, ...commonWordsPortuguese])

  const words = text.split(/\s+/).filter((word) => !allCommonWords.has(word.toLowerCase()))

  if (maxWords && maxCharacters) {
    return words.length <= maxWords || text.length <= maxCharacters
  }

  if (maxWords && !maxCharacters) {
    return words.length <= maxWords
  }

  if (!maxWords && maxCharacters) {
    return text.length <= maxCharacters
  }

  return false
}
