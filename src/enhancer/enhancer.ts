import { EnhancedDocument, ExtraMeta } from '@/types';
import { cleanup } from './cleanup';
import { getReadableDocumentWithMeta } from './getReadableDocumentWithMeta';
import { normalizeDataAttributes } from './normalizeDataAttributes';

export function enhancer(document: Document, extraMeta?: ExtraMeta): EnhancedDocument {
  cleanup(document);
  normalizeDataAttributes(document);

  return getReadableDocumentWithMeta(document, extraMeta);
}
