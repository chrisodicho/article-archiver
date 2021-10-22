export interface EnhancedDocument {
  document: Document;
  meta: {
    author?: string;
    authorLink?: string;
    date?: string;
    excerpt?: string;
    featuredImage?: string;
    length?: number;
    originalUrl?: string;
    siteName?: string;
    slug?: string;
    subtitle?: string;
    title?: string;
    metaArticleAuthor?: string;
    metaTwitterCreator?: string;
  };
}

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
