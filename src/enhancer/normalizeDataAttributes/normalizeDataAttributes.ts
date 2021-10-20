import { normalizeDataLanguage } from './data-language';

export function normalizeDataAttributes(document: Document): Document {
  normalizeDataLanguage(document);

  return document;
}
