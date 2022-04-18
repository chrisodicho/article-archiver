import path from 'path';

export function getCypressCommand(): string {
  const projectRootPath = path.resolve(__dirname, '../../');
  const cypressPath = path.resolve(projectRootPath, 'node_modules/.bin/cypress');
  const specPath = path.resolve(projectRootPath, 'cypress/integration/scraper.ts');

  return `${cypressPath} run --spec "${specPath}"`;
}
