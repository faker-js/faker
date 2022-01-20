
describe('Smoke Test', () => {
  it('compiles the playground page', () => {
    cy.visit('/playground/')
    cy.contains('Playground under construction')
  })
})
