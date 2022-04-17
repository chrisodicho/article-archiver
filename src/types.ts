export interface EnhancedDocument {
  raw: Document;
  readableContent: string;
  meta: DocumentMeta;
}

export interface DocumentMeta {
  author?: string;
  authorLink?: string;
  categories?: string[];
  date?: Date;
  excerpt?: string;
  featuredImage?: string;
  length?: number;
  originalUrl?: string;
  siteName?: string;
  slug?: string;
  subtitle?: string;
  tags?: string[];
  title?: string;
  metaArticleAuthor?: string;
  metaTwitterCreator?: string;
}

export interface ExtraMeta {
  fetchedAt?: Date;
  url?: string;
}

export enum Loggers {
  APP = 'app',
  ENHANCER = 'enhancer',
  SCRAPER = 'scraper',
  UTILS = 'utils',
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
  debug: boolean;
  tmpDir: string;
}

export enum DefaultOptions {
  TMP_DIR = '.article-archiver-tmp',
}
