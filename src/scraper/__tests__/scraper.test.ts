describe('scraper', () => {
  const execSync = jest.fn();

  beforeAll(() => {
    jest.mock('@/utils/paths', () => ({
      fullPathToThisProject: () => '/FAKE/Project/Path',
    }));

    jest.mock('child_process', () => {
      return {
        execSync,
      };
    });

    const { scraper } = require('../scraper'); // eslint-disable-line

    scraper('URL');
  });

  afterAll(() => {
    jest.unmock('child_process');
    jest.unmock('@/utils/paths');
  });

  describe('with required args', () => {
    beforeAll(() => {
      execSync.mockClear();
      const { scraper } = require('../scraper'); // eslint-disable-line

      scraper('COMMA,SEPARATED,URLS');
    });

    it('sets env var CYPRESS_ARTICLE_ARCHIVER_URLS to <urls>', () => {
      expect(process.env.CYPRESS_ARTICLE_ARCHIVER_URLS).toEqual('COMMA,SEPARATED,URLS');
    });

    it('sets env var ELECTRON_EXTRA_LAUNCH_ARGS to disable caching', () => {
      expect(process.env.ELECTRON_EXTRA_LAUNCH_ARGS).toEqual('--disable-http-cache --lang=es');
    });

    it('runs cypress in headless mode', () => {
      expect(execSync).toHaveBeenCalledWith('npx cypress run', {
        cwd: '/FAKE/Project/Path',
        stdio: 'ignore',
      });
    });
  });

  describe('with debug', () => {
    beforeAll(() => {
      execSync.mockClear();
      const { scraper } = require('../scraper'); // eslint-disable-line

      scraper('URL', { debug: true });
    });

    it('opens cypress and pipes output to stdio', () => {
      expect(execSync).toHaveBeenCalledWith('npx cypress run', {
        cwd: '/FAKE/Project/Path',
        stdio: 'inherit',
      });
    });
  });
});
