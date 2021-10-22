import { JSDOM } from 'jsdom';
import { normalizeDataAttributes } from '..';

describe('enhancer/normalizeDataAttributes', () => {
  describe('data-language', () => {
    it('extracts from ChromaJs code blocks', () => {
      const dom = new JSDOM(`
        <body>
          <pre class="chroma">
            <code data-lang="FAKE_LANGUAGE">
            </code>
          </pre>
        </body>
      `);

      const document = normalizeDataAttributes(dom.window.document);

      const preNode = document.querySelector('pre');
      expect(preNode?.getAttribute('data-language')).toEqual('FAKE_LANGUAGE');
    });

    it('extracts from Geshi code blocks', () => {
      const dom = new JSDOM(`
        <body>
          <div class="mw-geshi">
            <div class="source-FAKE_LANGUAGE">
              <pre>
              </pre>
            </div>
          </div>
        </body>
      `);

      const document = normalizeDataAttributes(dom.window.document);

      const preNode = document.querySelector('pre');
      expect(preNode?.getAttribute('data-language')).toEqual('FAKE_LANGUAGE');
    });

    it('extracts from HighlightJsV8 code blocks', () => {
      const dom = new JSDOM(`
        <body>
          <pre>
          <code class="hljs FAKE_LANGUAGE"></code>
          </pre>
        </body>
      `);

      const document = normalizeDataAttributes(dom.window.document);

      const preNode = document.querySelector('pre');
      expect(preNode?.getAttribute('data-language')).toEqual('FAKE_LANGUAGE');
    });

    it('extracts from HighlightJsV11 code blocks', () => {
      const dom = new JSDOM(`
        <body>
          <pre>
          <code class="hljs language-FAKE_LANGUAGE"></code>
          </pre>
        </body>
      `);

      const document = normalizeDataAttributes(dom.window.document);

      const preNode = document.querySelector('pre');
      expect(preNode?.getAttribute('data-language')).toEqual('FAKE_LANGUAGE');
    });
  });
});
