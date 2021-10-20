import { LogLevel, Options } from '@/types';
import { configure, getLogger, shutdown } from 'log4js';

const app = getLogger('app');
app.level = LogLevel.INFO;

const utils = getLogger('utils');
utils.level = LogLevel.INFO;

const scraper = getLogger('scraper');
scraper.level = LogLevel.INFO;

if (process.env.NODE_ENV === 'test') {
  shutdown();
}

export function setupLogger(options: Options): void {
  const logLevel: LogLevel = options.debug ? LogLevel.DEBUG : LogLevel.INFO;

  configure({
    appenders: { console: { type: 'console' }, file: { type: 'file', filename: 'article-archiver.log' } },
    categories: { default: { appenders: ['console', 'file'], level: logLevel } },
  });
  app.level = logLevel;
  utils.level = logLevel;
  scraper.level = logLevel;
}

export const logger = {
  app,
  utils,
  scraper,
};
