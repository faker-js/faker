describe('Guide Test', () => {
  it('navigates to the getting started section', () => {
    // given
    cy.visit('/');

    // when
    cy.get('a').contains('Get Started').click();

    // then
    cy.url().should('include', '/guide/');
    cy.contains('Getting Started');
  });
});
