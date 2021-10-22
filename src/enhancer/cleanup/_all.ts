export default function cleanupDefault(document: Document): Document {
  if (!document?.defaultView) {
    return document;
  }

  const { getComputedStyle } = document.defaultView;
  document.body.querySelectorAll('*').forEach((node) => {
    const nodeStyles = getComputedStyle(node);

    const isHidden =
      nodeStyles.visibility === 'hidden' ||
      nodeStyles.display === 'none' ||
      nodeStyles.opacity === '0' ||
      nodeStyles.width === '0' ||
      nodeStyles.width === '0px' ||
      nodeStyles.height === '0' ||
      nodeStyles.height === '0px';

    const isEmptyLink = node.tagName === 'A' && (node as HTMLElement).innerText === '';

    if (node?.parentElement && (isHidden || isEmptyLink)) {
      node.parentElement.removeChild(node);
    }
  });

  return document;
}
