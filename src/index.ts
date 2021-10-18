import { version } from './version';

export function hello(name = 'John'): string {
  return `Hello ${name} from article-archiver v${version}`;
}
