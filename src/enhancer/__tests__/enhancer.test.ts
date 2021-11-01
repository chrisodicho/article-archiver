import { JSDOM } from 'jsdom';
import { enhancer } from '..';

describe('enhancer', () => {
  describe('with valid input document', () => {
    it('returns an enhanced document with meta data', () => {
      const dom = new JSDOM();
      const enhancedDocument = enhancer(dom.window.document);

      expect(enhancedDocument.raw).toBeDefined();
      expect(enhancedDocument.readableContent).toBeDefined();
      expect(enhancedDocument.meta).toBeDefined();
    });
  });
});
