import { hello } from '../index';

describe('My Greeter', () => {
  it('greets', () => {
    expect(hello()).toBe('Hello John from article-archiver');
  });
});
