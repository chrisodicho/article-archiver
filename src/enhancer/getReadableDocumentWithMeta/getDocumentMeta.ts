import { DocumentMeta, ExtraMeta } from '@/types';
import { logger } from '@/utils/logger';
import { slugify } from '@/utils/slugify';
import { ParseResult } from 'mozilla-readability';

interface GetDocumentMetaOptions {
  readableDocument: ParseResult;
  extraMeta: ExtraMeta;
}

export function getDocumentMeta(document: Document, options: GetDocumentMetaOptions): DocumentMeta {
  const { extraMeta, readableDocument } = options;

  let publishedTime = extraMeta.fetchedAt ?? new Date();
  const metaArticlePublishedTime = document
    .querySelector('meta[property="article:published_time"]')
    ?.getAttribute('content');

  if (metaArticlePublishedTime) {
    publishedTime = new Date(metaArticlePublishedTime);
  }
  // const metaArticlePublishedTime = document.querySelector('meta[property="article:published_time"]');

  // if (metaArticlePublishedTime) {
  //   const metaArticlePublishedTimeValue = metaArticlePublishedTime.getAttribute('content');

  //   if (metaArticlePublishedTimeValue) {
  //     publishedTime = new Date(metaArticlePublishedTimeValue);
  //   }
  // }

  let slug = slugify(readableDocument.title).toLowerCase();

  if (!slug) {
    const firstH1 = document.querySelector('h1');
    if (firstH1) {
      slug = slugify(firstH1.innerText);
    }
  }

  if (!slug) {
    const { hostname, pathname } = document.location;
    slug = slugify(`${hostname}/${pathname}`);
    logger.enhancer.warn(`getDocumentMeta was not able to determine a slug. Defaulting to ${slug}`);
  }

  let author = readableDocument.byline || undefined;
  let authorLink = extraMeta.url;

  const metaArticleAuthor =
    document.querySelector('meta[property="article:author"]')?.getAttribute('content') ?? undefined;

  if (metaArticleAuthor?.startsWith('http')) {
    authorLink = metaArticleAuthor;
  } else if (!author && metaArticleAuthor) {
    author = metaArticleAuthor;
  }

  const metaTwitterCreator = document.querySelector('meta[property="twitter:creator"]');
  const metaTwitterCreatorContent = (metaTwitterCreator && metaTwitterCreator.getAttribute('content')) ?? '';

  // if (!author && (metaArticleAuthor || metaTwitterCreator)) {
  //   if (metaArticleAuthor) {
  //     author = metaArticleAuthor.getAttribute('content');
  //   } else if (metaTwitterCreator) {
  //     author = metaTwitterCreator.getAttribute('content');
  //   }

  //   if (author.startsWith('http:')) {
  //     authorLink = author;
  //     if (metaTwitterCreator && !readableDocument.byline) {
  //       author = metaTwitterCreator.getAttribute('content');
  //     }
  //   }
  // }

  let featuredImage;
  const metaOgImage = document.querySelector('meta[property="og:image"]');
  if (metaOgImage) {
    const metaOGImageValue = metaOgImage.getAttribute('content');
    if (metaOGImageValue) {
      featuredImage = metaOGImageValue;
    }
  }

  let subtitle;
  const metaOgDescription = document.querySelector('meta[property="og:description"]');
  if (metaOgDescription) {
    const metaOgDescriptionValue = metaOgDescription.getAttribute('content');

    if (metaOgDescriptionValue) {
      subtitle = metaOgDescriptionValue;
    }
  }

  let categories;
  const metaArticleSections = document.querySelectorAll('meta[property="article:section"]');
  if (metaArticleSections) {
    categories = [];

    metaArticleSections.forEach((section) => {
      categories.push(section.getAttribute('content'));
    });
  }

  let tags;
  const metaArticleTags = document.querySelectorAll('meta[property="article:tag"]');
  if (metaArticleTags) {
    tags = [];

    metaArticleTags.forEach((tag) => {
      tags.push(tag.getAttribute('content'));
    });
  }

  return {
    author,
    authorLink,
    categories,
    date: publishedTime,
    excerpt: readableDocument.excerpt,
    featuredImage,
    length: readableDocument.length,
    originalUrl: extraMeta.url,
    siteName: readableDocument.siteName || undefined,
    slug,
    subtitle,
    tags,
    title: readableDocument.title || undefined,
  };
}
