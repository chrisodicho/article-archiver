import { slugify } from '..';

describe('utils/slugify', () => {
  it('converts "SNAKE_CASE" into "snake-case"', () => {
    const input = 'SNAKE_CASE';

    const output = slugify(input);

    expect(output).toEqual('snake-case');
  });

  it('converts "A sentence of words." into "a-sentence-of-words"', () => {
    const input = 'A sentence of words.';

    const output = slugify(input);

    expect(output).toEqual('a-sentence-of-words');
  });

  it('converts "King & Queen" into "king-and-queen"', () => {
    const input = 'King & Queen';

    const output = slugify(input);

    expect(output).toEqual('king-and-queen');
  });

  it('converts "  Extra   whitespace  " into "extra-whitespace"', () => {
    const input = '  Extra   whitespace  ';

    const output = slugify(input);

    expect(output).toEqual('extra-whitespace');
  });

  it('converts "Rêpláçèś špėćíãł" into "replaces-special"', () => {
    const input = 'Rêpláçèś špėćíãł';

    const output = slugify(input);

    expect(output).toEqual('replaces-special');
  });
});
