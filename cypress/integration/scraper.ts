import { slugify } from '../../lib/utils/slugify';

const URLS = Cypress.env('ARTICLE_ARCHIVER_URLS') ? Cypress.env('ARTICLE_ARCHIVER_URLS').split(',') : [];
const TMP_DIR = Cypress.env('ARTICLE_ARCHIVER_TMP_DIR');

const currentTime = new Date();

URLS.forEach((url: string, idx: number) => {
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

        const slug = slugify(url);
        cy.task('writeFiles', {
          basePath: `${TMP_DIR}/${slug}`,
          filesByName: {
            'index.raw.html': document.documentElement.outerHTML,
          },
        });

        cy.get('body').should('exist');
      });
    });
  });
});
