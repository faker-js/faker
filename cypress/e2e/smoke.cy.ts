describe('Smoke Test', () => {
  it('compiles the guide page', () => {
    cy.visit('/guide/');
    cy.contains('Getting Started');
  });

  // it('compiles the playground page', () => {
  //   cy.visit('/playground/');
  //   cy.contains('Playground under construction');
  // });
});
