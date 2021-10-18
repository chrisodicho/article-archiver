import { hello } from '../index';
import { version } from '../version';

describe('My Greeter', () => {
  it(`greets with v${version}`, () => {
    expect(hello()).toBe(`Hello John from article-archiver v${version}`);
  });
});
