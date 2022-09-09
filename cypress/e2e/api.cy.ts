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

    it('should not have dead links', () => {
      cy.get('.api-group li a[href]').each(($el) => {
        cy.wrap($el).click();
        cy.get('VPContent').should('not.contain.text', 'PAGE NOT FOUND');
        cy.go(-1);
      });
    });
  });
});
