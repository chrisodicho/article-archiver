import { Command, Option } from 'commander';
import { version } from './version';
const program = new Command();

import { scraper } from '@/scraper';

program
  .version(version)
  .argument('<urls>', 'comma separated list of URLs to archive')
  .action(function (urls) {
    scraper(urls, program.opts());
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
