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
        cy.wrap($el).get('li a[href]').should('have.length.above', 0);
      });
    });

    it.only('should not have dead links', () => {
      cy.get('.api-group li').each(($el) => {
        const text = $el.find('a').text();
        const link = $el.find('a').attr('href');

        cy.visit(`/api/${link}`);

        cy.get('h2').should('include.text', text);
        cy.go('back');
      });
    });
  });
});
