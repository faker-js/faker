describe('Smoke Test', () => {
  beforeEach(() => {
    cy.visit('/guide/');
    cy.get('a[href="/api/animala.html"]').as('firstSectionLink');
  });

  it('compiles the guide page', () => {
    cy.contains('Getting Started');
  });

  it('renders this last code example in the code', () => {
    // Click on any section in the sidebar
    cy.get('@firstSectionLink')
      .click()
      // Make sure the number of code examples is the same between reloads
      .get('.container pre code')
      .then(($codeBlocks) => {
        // Trigger a reload
        cy.reload()
          // Give the runtime a chance to update/fail
          .wait(500)
          .get('.container pre code')
          .should('have.length', $codeBlocks.length);
      });
  });
});
