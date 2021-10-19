import { Command, Option } from 'commander';
import { version } from './version';
const program = new Command();

import { scraper } from '@/scraper';
import { logger, setupLogger } from '@/utils/logger';

program
  .version(version)
  .argument('<urls>', 'comma separated list of URLs to archive')
  .action(function (urls) {
    const options = program.opts();
    setupLogger(options);
    logger.app.debug(`started with options: ${JSON.stringify(options, null, 2)}`);
    scraper(urls, options);
  });

program.addOption(new Option('-d, --debug', 'output extra debugging').env('DEBUG'));
program.addOption(
  new Option('-o, --out-dir <directory>', 'specify the output directory')
    .env('OUT_DIR')
    .default('.', 'Current Directory'),
);
program.addOption(
  new Option('-t, --tmp-dir <directory>', 'specify the temporary directory')
    .env('TMP_DIR')
    .default('.article-archiver-tmp'),
);

program.parse(process.argv);
