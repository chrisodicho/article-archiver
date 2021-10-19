import path from 'path';

export function fullPathToThisProject(): string {
  return path.join(__dirname, '../..');
}
