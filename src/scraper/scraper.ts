import { execSync } from 'child_process';

import { Options } from '@/types';

export function scraper(urls: string, options: Options = {}) {
  process.env.CYPRESS_ARTICLE_ARCHIVER_URLS = urls;
  process.env.CYPRESS_ARTICLE_ARCHIVER_TMP_DIR = options.tempDir ?? '.article-archiver-tmp';
  process.env.ELECTRON_EXTRA_LAUNCH_ARGS = '--disable-http-cache --lang=es';

  const openOrRun = options.debug ? 'open' : 'run';

  let headless = options.debug ? '' : ' --headless';

  if (openOrRun === 'open') {
    headless = '';
  }

  execSync(`npx cypress ${openOrRun} --browser chrome:canary${headless}`, {
    stdio: options.debug ? 'inherit' : 'ignore',
  });
}
