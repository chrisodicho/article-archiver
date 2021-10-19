export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export interface Options {
  debug?: boolean;
  tmpDir?: string;
}

export enum DefaultOptions {
  TMP_DIR = '.article-archiver-tmp',
}
