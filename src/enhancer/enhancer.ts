import { EnhancedDocument } from '@/types';

export function enhancer(document: Document): EnhancedDocument {
  // removeVisuallyHiddenElements
  // addCodeBlockDataAttributes
  // getReadableDocumentAndMeta

  const meta = {};
  return { document, meta };
}
