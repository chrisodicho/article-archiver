import all from './_all';
import medium from './_medium.com';

export function cleanup(document: Document): Document {
  all(document);
  medium(document);

  return document;
}
