import { Loggers, LogLevel, Options } from '@/types';
import { configure, getLogger, shutdown } from 'log4js';

export const logger = {
  app: getLogger('app'),
  enhancer: getLogger('enhancer'),
  scraper: getLogger('scraper'),
  utils: getLogger('utils'),
};

if (process.env.NODE_ENV === 'test' && !process.env.LOG_LEVEL) {
  shutdown();
} else {
  const logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
  setAllLogLevels(logLevel);
}

export function setupLogger(options: Options): void {
  const logLevel: LogLevel = options.debug ? LogLevel.DEBUG : LogLevel.INFO;

  configure({
    appenders: { console: { type: 'console' }, file: { type: 'file', filename: 'article-archiver.log' } },
    categories: { default: { appenders: ['console', 'file'], level: logLevel } },
  });
  setAllLogLevels(logLevel);
}

function setAllLogLevels(logLevel: LogLevel) {
  Object.values(Loggers).forEach((type) => {
    logger[type].level = logLevel;
  });
}
