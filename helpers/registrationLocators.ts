import { Page, Locator } from '@playwright/test';

export function getRegistrationFormLocators(page: Page) {
  return {
    userNameField: page.locator('#signupName'),
    userLastNameField: page.locator('#signupLastName'),
    userEmailField: page.locator('#signupEmail'),
    passwordField: page.locator('#signupPassword'),
    rePasswordField : page.locator('#signupRepeatPassword'),
    errorMessages: page.locator('.invalid-feedback p'),
    signUpButton: page.getByRole('button', { name: 'Sign up' }),
	registerButton: page.getByRole('button', { name: 'Register' }),
  };
}