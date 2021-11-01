import { isProbablyReaderable, Readability } from '@mozilla/readability';
import { EnhancedDocument, ExtraMeta } from '@/types';
import { getDocumentMeta } from './getDocumentMeta';
import { logger } from '@/utils/logger';

export function getReadableDocumentWithMeta(document: Document, extraMeta: ExtraMeta = {}): EnhancedDocument {

  try {
    const DOMPurify = require('isomorphic-dompurify');
    const cleanDocumentBody = DOMPurify.sanitize(document.body.innerHTML);
    document.body.innerHTML = cleanDocumentBody;
  } catch(error) {
    logger.enhancer.warn('dompurify failed to sanitize the document');
    logger.enhancer.debug(error)
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
