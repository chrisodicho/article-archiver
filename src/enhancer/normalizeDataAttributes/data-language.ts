function normalizeChromaJsAttributes(document: Document): Document {
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
          const preNode = node.querySelector('pre');
          if (preNode) {
            preNode.setAttribute('data-language', className.replace('source-', ''));
          }
        }
      });
    }
  });
  return document;
}

function normalizeHighlightJsV8Attributes(document: Document): Document {
  document.querySelectorAll('pre code.hljs').forEach((node) => {
    const language = node.className.split(' ').find((className) => {
      return className !== 'code' && className !== 'hljs';
    });

    if (language && node.parentElement) {
      node.parentElement.setAttribute('data-language', language);
    }
  });
  return document;
}

function normalizeHighlightJsV11Attributes(document: Document): Document {
  document.querySelectorAll('pre code.hljs').forEach((node) => {
    node.className.split(' ').forEach((className) => {
      if (className.indexOf('language-') === 0) {
        if (node.parentElement) {
          node.parentElement.setAttribute('data-language', className.replace('language-', ''));
        }
      }
    });
  });
  return document;
}

export function normalizeDataLanguage(document: Document): Document {
  normalizeChromaJsAttributes(document);
  normalizeGeshiAttributes(document);
  normalizeHighlightJsV8Attributes(document);
  normalizeHighlightJsV11Attributes(document);

  return document;
}
