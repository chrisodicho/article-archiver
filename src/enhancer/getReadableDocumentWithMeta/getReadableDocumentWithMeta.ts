import { isProbablyReaderable, Readability } from '@mozilla/readability';
import { sanitize } from 'isomorphic-dompurify';
import { EnhancedDocument, ExtraMeta } from '@/types';
import { logger } from '@/utils/logger';
import { getDocumentMeta } from './getDocumentMeta';

export function getReadableDocumentWithMeta(document: Document, extraMeta: ExtraMeta = {}): EnhancedDocument {
  try {
    const cleanDocumentBody = sanitize(document.body.innerHTML);
    document.body.innerHTML = cleanDocumentBody;
  } catch (error) {
    logger.enhancer.warn('DOMpurify failed to sanitize the document');
    logger.enhancer.debug(error);
  }

  if (!isProbablyReaderable(document)) {
    logger.enhancer.warn('@mozilla/readability considers this document to unlikely be readerable.');
  }

  const readableDocument = new Readability(document, { keepClasses: true }).parse();

  if (readableDocument === null) {
    logger.enhancer.error('@mozilla/readability returned `null` content.');
    return {
      raw: document,
      readableContent: '',
      meta: {},
    };
  }

  const readableContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    </head>
    <body>
      ${readableDocument.content}
    </body>
  </html>
`;

  const meta = getDocumentMeta(document, { readableDocument, extraMeta });

  return {
    raw: document,
    readableContent,
    meta,
  };
}
