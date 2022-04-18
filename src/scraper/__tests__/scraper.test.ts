import { getCypressCommand } from '@/utils/cypress';

const mockExecSync = jest.fn();

jest.mock('@/utils/paths', () => ({
  fullPathToThisProject: () => '/FAKE/Project/Path',
}));

jest.mock('child_process', () => {
  return {
    execSync: mockExecSync,
  };
});

const { scraper } = require('../scraper');

describe('scraper', () => {
  describe('with required args', () => {
    beforeAll(async () => {
      mockExecSync.mockClear();
      await scraper('COMMA,SEPARATED,URLS');
    });

    it('sets env var CYPRESS_ARTICLE_ARCHIVER_URLS to <urls>', async () => {
      expect(process.env.CYPRESS_ARTICLE_ARCHIVER_URLS).toEqual('COMMA,SEPARATED,URLS');
    });

    it('sets env var ELECTRON_EXTRA_LAUNCH_ARGS to disable caching', () => {
      expect(process.env.ELECTRON_EXTRA_LAUNCH_ARGS).toEqual('--disable-http-cache --lang=es');
    });

    it('runs cypress in headless mode', () => {
      const cypressCommand = getCypressCommand();
      expect(mockExecSync).toHaveBeenCalledWith(cypressCommand, {
        cwd: '/FAKE/Project/Path',
        stdio: 'ignore',
      });
    });
  });

  describe('with debug', () => {
    beforeAll(async () => {
      mockExecSync.mockClear();

      await scraper('URL', { debug: true });
    });

    it('opens cypress and pipes output to stdio', () => {
      const cypressCommand = getCypressCommand();
      expect(mockExecSync).toHaveBeenCalledWith(cypressCommand, {
        cwd: '/FAKE/Project/Path',
        stdio: 'inherit',
      });
    });
  });
});
