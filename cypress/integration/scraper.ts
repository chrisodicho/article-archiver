const URLS = Cypress.env('ARTICLE_ARCHIVER_URLS') ? Cypress.env('ARTICLE_ARCHIVER_URLS').split(',') : [];
const TMP_DIR = Cypress.env('ARTICLE_ARCHIVER_TMP_DIR');

const currentTime = new Date();

URLS.forEach((url, idx) => {
  describe(`Parsing site ${idx + 1} (${currentTime.toISOString()})`, () => {
    before(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      cy.intercept(
        {
          method: 'GET',
          url: /accounts\.google\.com/,
        },
        {},
      );

      cy.visit(url);
      cy.scrollTo('bottom', { easing: 'linear', duration: 5000 });
      cy.wait(1000);
    });

    it(url, () => {
      cy.document().then(async (document) => {
        if (!document) {
          throw new Error('No document object found');
        }

        const readabilityJson = {
          slug: 'test',
          success: true,
        };

        cy.task('writeFiles', {
          basePath: `${TMP_DIR}/${readabilityJson.slug}`,
          filesByName: {
            'index.html': document.documentElement.outerHTML,
            'front-matter.json': JSON.stringify(readabilityJson, null, 2),
          },
        });

        cy.get('body').should('exist');
      });
    });
  });
});
