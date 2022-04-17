import { logger, setupLogger } from '@/utils/logger';
import { scraper } from '@/scraper';
import { Options, DefaultOptions } from '@/types';
import { lstatSync, readdirSync } from 'fs';
import path from 'path';

const isDirectory = (source: string) => lstatSync(source).isDirectory();

const getDirectories = (source: string) =>
  readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory)
    .map((fullName) => fullName.replace(`${source}/`, ''));

export async function main(urls: string, options: Options) {
  const optionsWithDefaults: Options = {
    debug: options?.debug ?? false,
    tmpDir:
      options?.tmpDir === DefaultOptions.TMP_DIR ? path.resolve(process.cwd(), DefaultOptions.TMP_DIR) : options.tmpDir,
  };

  setupLogger(options);
  logger.app.debug(`Started article-archiver with options: ${JSON.stringify(optionsWithDefaults, null, 2)}`);

  await scraper(urls, optionsWithDefaults);

  // TODO: Use these slugs to generate unique folder names
  const slugs = getDirectories(optionsWithDefaults.tmpDir);
  console.log({ slugs });
}
