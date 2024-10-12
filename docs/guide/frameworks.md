# Frameworks

Faker can easily be used with a variety of testing frameworks. Here are a few examples with popular frameworks.

Note that these examples use only the `en` locale for better performance. For more information visit [localization](./localization.md).

## Vitest and Jest

Since [Vitest](https://vitest.dev/) and [Jest](https://jestjs.io/) use an extremely similar notation, this section will cover both at once.
The main difference is that testing methods need to be imported in Vitest.
Simply crop that line out for a Jest integration.

These frameworks work about exactly as you would expect with Faker. Here's a minimal example:

```ts
import { faker } from '@faker-js/faker/locale/en';
import { describe, expect, it } from 'vitest';

describe('reverse array', () => {
  it('should reverse the array', () => {
    const title = faker.person.jobTitle();
    const name = faker.person.fullName();
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
import { faker } from '@faker-js/faker/locale/en';
import { afterEach, describe, expect, it } from 'vitest';

// We might want other tests to *not* be seeded. This will re-seed our faker instance after each test.
afterEach(() => {
  faker.seed();
});

describe('reverse array', () => {
  it('should reverse the array', () => {
    // Seed our faker instance with some static number.
    faker.seed(1234);
    const title = faker.person.jobTitle();
    const name = faker.person.fullName();
    const animal = faker.animal.bear();

    const array = [title, name, animal];

    expect(array.reverse()).toStrictEqual([animal, name, title]);

    // Expect our value to always match a generated snapshot.
    expect(array.reverse()).toMatchSnapshot();
  });
});
```

## Cypress

[Cypress](https://www.cypress.io/) integration is fairly straightforward as well:

```ts
import { faker } from '@faker-js/faker/locale/en';

describe('Testing the application', () => {
  it('should create an account with username and password', () => {
    let username = faker.internet.username(); // before version 9.1.0, use userName()
    let password = faker.internet.password();
    let email = faker.internet.exampleEmail();

    // Visit the a webpage and create an account.
    cy.visit('https://www.example.com/register');

    cy.get('#email-input').type(email);
    cy.get('#username-input').type(username);
    cy.get('#password-input').type(password);
    cy.get('#password-confirm-input').type(password);

    cy.get('#register-submit-input').click();

    // Now, we try to login with these credentials.
    cy.visit('https://www.example.com/login');

    cy.get('#email-input').type(email);
    cy.get('#password-input').type(password);

    cy.get('#login-submit-input').click();

    // We should have logged in successfully to the dashboard page.
    cy.url().should('include', '/dashboard');
  });
});
```

## Playwright

Integration with [Playwright](https://playwright.dev/) is also easy:

```ts
import { faker } from '@faker-js/faker/locale/en';
import { expect, test } from '@playwright/test';

test.describe('Testing the application', () => {
  test('should create an account with username and password', async ({
    page,
  }) => {
    const username = faker.internet.username(); // before version 9.1.0, use userName()
    const password = faker.internet.password();
    const email = faker.internet.exampleEmail();

    // Visit the webpage and create an account.
    await page.goto('https://www.example.com/register');
    await page.getByLabel('email').fill(email);
    await page.getByLabel('username').fill(username);
    await page.getByLabel('password', { exact: true }).fill(password);
    await page.getByLabel('confirm password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    // Now, we try to login with these credentials.
    await page.goto('https://www.example.com/login');
    await page.getByLabel('email').fill(email);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // We should have logged in successfully to the dashboard page.
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
```
