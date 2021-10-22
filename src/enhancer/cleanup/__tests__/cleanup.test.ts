import { JSDOM } from 'jsdom';
import { cleanup } from '..';

describe('enhancer/cleanup', () => {
  it('removes visually hidden elements from all articles', () => {
    const dom = new JSDOM(`
        <body>
          <a style="visibility: hidden">HIDDEN</a>
          <a style="opacity: 0">HIDDEN</a>
          <a style="display: none">HIDDEN</a>
          <a style="width: 100px; height: 0">HIDDEN</a>
          <a style="width: 0; height: 100px">HIDDEN</a>
          <a style="width: 0; height: 0">HIDDEN</a>
        </body>
      `);

    const document = cleanup(dom.window.document);

    expect(document.body.innerHTML.trim()).toEqual('');
  });

  it('removes highlight box from medium.com articles', () => {
    const dom = new JSDOM(`
      <body>
        <div id="lo-highlight-meter-1-highlight-box"></div>
      </body>
      `, {
      url: 'https://medium.com',
    });

    const document = cleanup(dom.window.document);

    expect(document.querySelector('.lo-highlight-meter-1-highlight-box')).toBeNull();
  });
});
