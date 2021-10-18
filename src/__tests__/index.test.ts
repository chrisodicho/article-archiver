import { hello } from '../index';
import { version } from '../version';

describe('My Greeter', () => {
  it('greets', () => {
    expect(hello()).toBe(`Hello John from article-archiver v${version}`);
  });
});
