function normalizeChromaAttributes(document: Document): Document {
  document.querySelectorAll('pre.chroma code').forEach((node) => {
    if (!node.parentElement) {
      return;
    }

    const dataLang = node.getAttribute('data-lang');

    if (dataLang) {
      node.parentElement.setAttribute('data-language', dataLang);
    }
  });
  return document;
}

function normalizeGeshiAttributes(document: Document): Document {
  document.querySelectorAll('.mw-geshi').forEach((node) => {
    const firstChild = node.children[0];

    if (firstChild) {
      firstChild.className.split(' ').forEach((className) => {
        if (className.indexOf('source-') === 0) {
          node.setAttribute('data-language', className.replace('source-', ''));
        }
      });
    }
  });
  return document;
}

function normalizeHighlightJsAttributes(document: Document): Document {
  document.querySelectorAll('pre.code.hljs').forEach((node) => {
    const language = node.className.split(' ').find((className) => {
      return className !== 'code' && className !== 'hljs';
    });

    if (language) {
      node.setAttribute('data-language', language);
    }
  });
  return document;
}

export function normalizeDataLanguage(document: Document): Document {
  normalizeChromaAttributes(document);
  normalizeGeshiAttributes(document);
  normalizeHighlightJsAttributes(document);

  return document;
}
