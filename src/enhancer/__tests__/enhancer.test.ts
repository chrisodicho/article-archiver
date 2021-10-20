/**
 * @jest-environment jsdom
 */

import { enhancer } from '..';

describe('enhancer', () => {
  describe('with valid input document', () => {
    it('returns an enhanced document with meta data', () => {
      const enhancedDocument = enhancer(document);

      expect(enhancedDocument.document).toBeDefined();
      expect(enhancedDocument.meta).toBeDefined();
    });
  });
});
