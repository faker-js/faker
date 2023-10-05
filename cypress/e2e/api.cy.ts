describe('API Test', () => {
  it('navigates to the api index search', () => {
    // given
    cy.visit('/');

    // when
    cy.get('a').contains('API').click();

    // then
    cy.url().should('include', '/api/');
    cy.contains('API Reference');
  });

  describe('API Reference', () => {
    beforeEach(() => {
      // given
      cy.visit('/api/');
    });

    it('should at least list more than 7 modules', () => {
      cy.get('.api-group').should('have.length.above', 7);
    });

    it('should include at least 1 element in each module', () => {
      cy.get('.api-group').each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('li a[href]').should('have.length.above', 0);
        });
      });
    });

    it('should not have dead links', () => {
      const checked = new Set<string>();
      cy.get('.api-group li').each(($el) => {
        const anchor = $el.find('a');
        const text = anchor.text();
        const link = anchor.attr('href')?.split('#')[0] ?? 'MISSING';
        if (checked.has(link)) {
          return;
        }

        checked.add(link);

        cy.request({
          method: 'HEAD',
          url: link,
          failOnStatusCode: false,
        })
          .should(({ status }) => {
            expect(
              status,
              `${text} to have a working link: /api/${link}`
            ).to.eq(200);
          })
          .end();
      });
    });
  });
});
