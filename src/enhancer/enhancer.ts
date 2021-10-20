import { EnhancedDocument } from '@/types';
import { cleanup } from './cleanup';
import { normalizeDataAttributes } from './normalizeDataAttributes';

export function enhancer(document: Document): EnhancedDocument {
  cleanup(document);
  normalizeDataAttributes(document);
  // getReadableDocumentAndMeta

  const meta = {};
  return { document, meta };
}
