import { JSDOM } from 'jsdom';
import { normalizeDataAttributes } from '..';

describe('enhancer/normalizeDataAttributes', () => {
  describe('data-language', () => {
    it('removes highlight box from medium articles', () => {
      const dom = new JSDOM('<body><div id="lo-highlight-meter-1-highlight-box"></div></body>', {
        url: 'https://medium.com',
      });

      const document = normalizeDataAttributes(dom.window.document);

      expect(document.querySelector('.lo-highlight-meter-1-highlight-box')).toBeNull();
    });
  });
});
