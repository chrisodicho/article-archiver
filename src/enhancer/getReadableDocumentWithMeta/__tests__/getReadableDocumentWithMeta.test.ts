import { JSDOM } from 'jsdom';
import { getReadableDocumentWithMeta } from '..';

describe('enhancer/getReadableDocumentWithMeta', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2021-01-01').getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it.only('removes visually hidden elements from all articles', () => {
    const BODY_CONTENT = `<body>
        This text needs to be at least 140 characters before readability will consider parsing it.
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </body>`;
    const dom = new JSDOM(BODY_CONTENT, {
      url: 'https://example.com/fake-article',
    });

    const { readableContent, meta } = getReadableDocumentWithMeta(dom.window.document);

    expect(readableContent).toEqual(`<!DOCTYPE html>
  <html lang=\"en\">
    <head>
      <meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />
    </head>
    <body>
      <div id=\"readability-page-1\" class=\"page\">
        This text needs to be at least 140 characters before readability will consider parsing it.
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </div>
    </body>
  </html>
`);
    expect(meta).toEqual({
      author: undefined,
      authorLink: undefined,
      categories: [],
      date: new Date('2021-01-01'),
      excerpt: undefined,
      featuredImage: undefined,
      length: 156,
      originalUrl: undefined,
      siteName: undefined,
      slug: 'examplecom-fake-article',
      subtitle: undefined,
      tags: [],
      title: undefined,
    });
  });
});
