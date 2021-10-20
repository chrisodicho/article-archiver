export default function cleanupMedium(document: Document): Document {
  if (document.location.hostname !== 'medium.com') {
    return document;
  }

  const meteredContent = document.querySelector('article.meteredContent');

  if (meteredContent) {
    console.log('Found meteredContent');
    document.body.innerHTML = '';
    document.body.appendChild(meteredContent);
  }

  document.body.querySelectorAll('*').forEach((node) => {
    // Remove the unrelated highlight box at the bottom of articles
    const isUnrelatedToArticle = node.id === 'lo-highlight-meter-1-highlight-box';

    if (node?.parentElement && isUnrelatedToArticle) {
      node.parentElement.removeChild(node);
    }
  });

  return document;
}
