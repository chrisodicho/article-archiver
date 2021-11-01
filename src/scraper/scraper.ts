import path from 'path';
import { execSync } from 'child_process';
import { DefaultOptions, Options } from '@/types';
import { logger } from '@/utils/logger';
import { fullPathToThisProject } from '@/utils/paths';

export function scraper(urls: string, options: Options = {}) {
  logger.scraper.debug(`Running from dir: ${path.join(__dirname, '../..')}`);

  process.env.CYPRESS_ARTICLE_ARCHIVER_URLS = urls;
  process.env.CYPRESS_ARTICLE_ARCHIVER_TMP_DIR = options.tmpDir ?? DefaultOptions.TMP_DIR;
  process.env.ELECTRON_EXTRA_LAUNCH_ARGS = '--disable-http-cache --lang=es';

  const startTime = new Date().getTime();

  logger.scraper.info(`Started scraping: ${urls}`);

  execSync(`npx cypress run`, {
    cwd: fullPathToThisProject(),
    stdio: options.debug ? 'inherit' : 'ignore',
  });

  const endTime = ((new Date().getTime() - startTime) / 1000).toFixed(2);

  logger.scraper.info(`Finished scraping: ${urls} (${endTime}s)`);
}
