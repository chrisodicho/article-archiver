import path from 'path';
import { execSync } from 'child_process';
import { Options } from '@/types';
import { logger } from '@/utils/logger';
import { fullPathToThisProject } from '@/utils/paths';

export async function scraper(urls: string, options: Options) {
  logger.scraper.debug(`Running from dir: ${path.join(__dirname, '../..')}`);

  const { tmpDir } = options;

  process.env.CYPRESS_ARTICLE_ARCHIVER_URLS = urls;
  process.env.CYPRESS_ARTICLE_ARCHIVER_TMP_DIR = tmpDir;
  process.env.ELECTRON_EXTRA_LAUNCH_ARGS = '--disable-http-cache --lang=es';

  const startTime = new Date().getTime();

  const fsUtils = require('@/utils/fs');
  try {
    await fsUtils.directoryExists(tmpDir);
    logger.scraper.info(`Temporary directory exists: ${tmpDir}`);
  } catch {
    logger.scraper.info(`Creating temporary directory at: ${tmpDir}`);
    fsUtils.createDir(tmpDir);
  }

  logger.scraper.info(`Started scraping: ${urls}`);

  const projectRootPath = path.resolve(__dirname, '../../');
  const cypressPath = path.resolve(projectRootPath, 'node_modules/.bin/cypress');
  const specPath = path.resolve(projectRootPath, 'cypress/integration/scraper.ts');

  execSync(`${cypressPath} run --spec "${specPath}"`, {
    cwd: fullPathToThisProject(),
    stdio: options.debug ? 'inherit' : 'ignore',
  });

  const endTime = ((new Date().getTime() - startTime) / 1000).toFixed(2);

  logger.scraper.info(`Finished scraping: ${urls} (${endTime}s)`);
}
