import { Command } from 'commander';
import { version } from './version';
const program = new Command();

import { hello } from '.';

program
  .version(version)
  .argument('<urls>', 'comma separated list of URLs to archive')
  .action(function (urls) {
    console.log(hello(urls));
  });

program.option('-d, --debug', 'output extra debugging');

program.parse(process.argv);
