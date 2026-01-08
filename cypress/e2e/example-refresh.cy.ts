describe('example-refresh', () => {
  it('should refresh the example content on click', () => {
    // given
    cy.visit('/api/faker.html#constructor');
    
    // Create aliases for reuse to keep selectors clean
    cy.get('.refresh').first().as('refreshBtn');
    cy.get('@refreshBtn').next().find('code').as('codeBlock');

    // Capture the initial text
    cy.get('@codeBlock').invoke('text').then((text1) => {
      
      // Act: First Click
      cy.get('@refreshBtn')
        .click()
        .should('not.be.disabled'); // Wait for button to be interactive again

      // Assert: Validate change (using .should allows Cypress to retry if update lags)
      cy.get('@codeBlock').should(($el) => {
        const text2 = $el.text();
        expect(text2).to.not.equal(text1);
      }).then(($el) => {
        // Capture text2 specifically for the next comparison
        const text2 = $el.text();

        // Act: Second Click
        cy.get('@refreshBtn')
            .click()
            .should('not.be.disabled');

        // Assert: Validate change against BOTH previous states
        cy.get('@codeBlock').should(($el) => {
          const text3 = $el.text();
          expect(text3).to.not.equal(text1);
          expect(text3).to.not.equal(text2);
        });
      });
    });
  });
});
