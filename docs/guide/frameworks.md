# Frameworks

Faker can easily be used with a variety of testing frameworks. Here are a few examples with popular frameworks.

Note that these examples use only the `en` locale for better performance. For more information visit [localization](./localization.md).

## Vitest and Jest

Since [Vitest](https://vitest.dev/) and [Jest](https://jestjs.io/) use an extremely similar notation, this section will cover both at once.
The main difference is that testing methods need to be imported in Vitest.
Simply crop that line out for a Jest integration.

These frameworks work about exactly as you would expect with Faker. Here's a minimal example:

```ts
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';

describe('reverse array', () => {
  it('should reverse the array', () => {
    const title = faker.name.jobTitle();
    const name = faker.name.fullName();
    const animal = faker.animal.bear();

    const array = [title, name, animal];

    expect(array.reverse()).toStrictEqual([animal, name, title]);
  });
});
```

It can sometimes be useful to do seeded tests, where we seed our faker instance with a static value so that it will generate the same random value each time.
These are especially useful in tests that are meant to be deterministic, such as snapshot tests.

- [Snapshots in Vitest](https://vitest.dev/guide/snapshot.html)
- [Snapshots in Jest](https://jestjs.io/docs/snapshot-testing)

```ts
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';

// We might want other tests to *not* be seeded. This will re-seed our faker instance after each test.
afterEach(() => {
  faker.seed();
});

describe('reverse array', () => {
  it('should reverse the array', () => {
    // Seed our faker instance with some static number.
    faker.seed(1234);
    const title = faker.name.jobTitle();
    const name = faker.name.fullName();
    const animal = faker.animal.bear();

    const array = [title, name, animal];

    expect(array.reverse()).toStrictEqual([animal, name, title]);

    // Expect our value to always match a generated snapshot.
    expect(array.reverse()).toMatchSnapshot();
  });
});
```

## Cypress

[Cypress](https://www.cypress.io/) integration is fairly straighforward as well:

```ts
import { faker } from '@faker-js/faker/locale/en';

describe('Testing the application', () => {
  it('should create an account with username and password', () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();
    let email = faker.internet.exampleEmail();

    // Visit the a webpage and create an account.
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

    cy.get('#login-submit-input').click();

    //we should have logged in successfully to the dashboard page.
    cy.url().should('include', '/dashboard');
  });
});
```
