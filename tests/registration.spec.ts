import { test, expect } from "@playwright/test";
import { getRegistrationFormLocators } from "../helpers/registrationLocators";
import { expectInvalidInput } from '../helpers/expectInvalidInput';

test.describe("Testing registration form with empty fields", () => {
  test.beforeEach(async ({ page }) => {
    const { signUpButton } = getRegistrationFormLocators(page);
    await page.goto("/");
    await signUpButton.click();
  });

  test("name field is empty", async ({ page }) => {
    const { userNameField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await userNameField.focus();
    await userNameField.blur();
	await expectInvalidInput(userNameField, errorMessages, "Name required", registerButton);
  });

  test("last name field is empty", async ({ page }) => {
    const { userLastNameField, errorMessages, registerButton } =
      getRegistrationFormLocators(page);
    await userLastNameField.focus();
    await userLastNameField.blur();
	await expectInvalidInput(userLastNameField, errorMessages, "Last name required", registerButton);
  });

  test("email field is empty", async ({ page }) => {
    const { userEmailField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await userEmailField.focus();
    await userEmailField.blur();
	await expectInvalidInput(userEmailField, errorMessages, "Email required", registerButton);
  });

  test("password field is empty", async ({ page }) => {
    const { passwordField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await passwordField.focus();
    await passwordField.blur();
	await expectInvalidInput(passwordField, errorMessages, "assword required", registerButton);
  });

  test("re-password field is empty", async ({ page }) => {
    const { rePasswordField , errorMessages, registerButton } =
      getRegistrationFormLocators(page);
    await rePasswordField .focus();
    await rePasswordField .blur();
	await expectInvalidInput(rePasswordField, errorMessages, "Re-enter password required", registerButton);
  });
});

test.describe("Testing registration form with wrong data", () => {
  test.beforeEach(async ({ page }) => {
    const { signUpButton } = getRegistrationFormLocators(page);
    await page.goto("/");
    await signUpButton.click();
  });

  test("name field with wrong data", async ({ page }) => {
    const { userNameField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await userNameField.fill("#$%");
    await userNameField.blur();
	await expectInvalidInput(userNameField, errorMessages, "Name is invalid", registerButton);
  });

  test("last name field with wrong data", async ({ page }) => {
    const { userLastNameField, errorMessages, registerButton } =
      getRegistrationFormLocators(page);
    await userLastNameField.fill("#$%");
    await userLastNameField.blur();
	await expectInvalidInput(userLastNameField, errorMessages, "Last name is invalid", registerButton);
  });

  test("email field with wrong data", async ({ page }) => {
    const { userEmailField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await userEmailField.fill("#$%");
    await userEmailField.blur();
	await expectInvalidInput(userEmailField, errorMessages, "Email is incorrect", registerButton);
  });

  test("password field with wrong data", async ({ page }) => {
    const { passwordField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await passwordField.fill("#$%");
    await passwordField.blur();
	await expectInvalidInput(passwordField, errorMessages, "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter", registerButton);
  });

  test("re-password field with wrong data", async ({ page }) => {
    const { rePasswordField , errorMessages, registerButton } =
      getRegistrationFormLocators(page);
    await rePasswordField.fill("#$%");
    await rePasswordField.blur();
	await expectInvalidInput(rePasswordField, errorMessages, "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter", registerButton);
  });
});

test.describe("Testing registration form with wrong length", () => {
  test.beforeEach(async ({ page }) => {
    const { signUpButton } = getRegistrationFormLocators(page);
    await page.goto("/");
    await signUpButton.click();
  });

  test("name field with wrong length", async ({ page }) => {
    const { userNameField, errorMessages, registerButton } = getRegistrationFormLocators(page);
    await userNameField.fill("A");
    await userNameField.blur();
    await expect(errorMessages).toContainText("Name has to be from 2 to 20 characters long");
	// const userNameFieldValue = await userNameField.inputValue();
	// const trimmedValue = userNameFieldValue.trim();
	// expect(trimmedValue.length).toBeGreaterThan(2);
	// expect(trimmedValue.length).toBeLessThanOrEqual(20);
	await expect(userNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
	await expect(registerButton).toBeDisabled();
  });

  test("last name field with wrong length", async ({ page }) => {
    const { userLastNameField, errorMessages, registerButton } =
      getRegistrationFormLocators(page);
    await userLastNameField.fill("A");
    await userLastNameField.blur();
    await expect(errorMessages).toContainText("Last name has to be from 2 to 20 characters long");
	await expect(userLastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
	await expect(registerButton).toBeDisabled();
  });
});

test.describe("Testing registration form with correct credentials", () => {
	test.beforeEach(async ({ page }) => {
	  const { signUpButton } = getRegistrationFormLocators(page);
	  await page.goto("/");
	  await signUpButton.click();
	});
  
	test("all fields are filled with correct credentials", async ({ page }) => {
	  const { userNameField, userLastNameField, userEmailField, passwordField, rePasswordField , registerButton } = getRegistrationFormLocators(page);
	  const uniqueEmail = `aqa-vva1979+${Date.now()}@ukr.net`; 
	  await userNameField.fill("Volodymyr");
	  await userLastNameField.fill("Voloshyn");
	  await userEmailField.fill(uniqueEmail);
	  await passwordField.fill("Password1");
	  await rePasswordField .fill("Password1");
	  await rePasswordField .blur();
	  await expect(registerButton).toBeEnabled();
	  await registerButton.click();
	  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
	});
  
  });