# Frameworks

Faker can easily be used with a variety of testing frameworks. Here are a few examples with popular frameworks, as well as some edge cases you should be aware of.

## Vitest

Faker works about exactly as you would expect with Vitest. Here's a minimal example:

```ts
import { assert, test } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';

test('reverse array', () => {
  let title = faker.name.jobTitle();
  let name = faker.name.fullName();
  let animal = faker.animal.bear();

  let array = [title, name, animal];

  assert.deepEqual(array.reverse(), [animal, name, title]);
});
```

## Jest

Jest integrates similarly.

```ts
import { faker } from '@faker-js/faker/locale/en';

describe('example tests', () => {
  test('reverse array', () => {
    let title = faker.name.jobTitle();
    let name = faker.name.fullName();
    let animal = faker.animal.bear();

    let array = [title, name, animal];
    console.log('1', array);

    expect(array.reverse()).toMatchObject([animal, name, title]);
  });
});
```

##Cypress

You can use Cypress in a similar way:

```ts
import { faker } from '@faker-js/faker/locale/en';

describe('Testing the application', function () {
  it('should create an account with username and password', function () {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    let email = faker.internet.exampleEmail();

    // visit the a webpage and create an account.
    cy.visit('https://www.example.com/register');

    cy.get('#email-input').type(email);
    cy.get('#username-input').type(username);
    cy.get('#password-input').type(password);
    cy.get('#password-confirm-input').type(password);

    cy.get('#register-submit-input').click();

    //now we try to login with these credentials.
    cy.visit('https://www.example.com/login');

    cy.get('#email-input').type(email);
    cy.get('#password-input').type(password);

    //we should have logged in successfully to the dashboard page.
    cy.url().should('include', '/dashboard');
  });
});
```
