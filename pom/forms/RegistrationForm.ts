import { expect, Locator } from '@playwright/test';
import BasePage from "../pages/BasePage";

export default class RegistrationForm extends BasePage {
  static readonly INVALID_BORDER_COLOR = 'rgb(220, 53, 69)';
  static readonly URL = 'https://qauto.forstudy.space/panel/garage';

  get userNameField() {
    return this.page.locator("#signupName");
  }

  get userLastNameField() {
    return this.page.locator("#signupLastName");
  }

  get userEmailField() {
    return this.page.locator("#signupEmail");
  }

  get passwordField() {
    return this.page.locator("#signupPassword");
  }

  get rePasswordField() {
    return this.page.locator("#signupRepeatPassword");
  }

  get errorMessages() {
    return this.page.locator("//div[@class='invalid-feedback']//p");
  }

  get registerButton() {
    return this.page.getByRole("button", { name: "Register" });
  }

  private async assertFieldValidationError(field: Locator, error: Locator, expectedMessage: string) {
    await expect(error).toBeVisible();
    await expect(error).toContainText(expectedMessage);
    await expect(field).toHaveCSS('border-color', RegistrationForm.INVALID_BORDER_COLOR);
    await expect(this.registerButton).toBeDisabled();
  }
  

  async triggerErrorOnEmptyField(field: Locator, error: Locator, message: string) {
    await field.focus();
    await field.blur();
    await this.assertFieldValidationError(field, error, message);
  }

  async fillFieldWithWrongData(field: Locator, wrongData, error: Locator, message: string) {
    await field.fill(wrongData);
    await field.blur();
    await this.assertFieldValidationError(field, error, message);
  }

  async fillAllFieldsWithCorrectData(userName, userLastName, email, password, rePassword) {
    await this.userNameField.fill(userName);
    await this.userLastNameField.fill(userLastName);
    await this.userEmailField.fill(email);
    await this.passwordField.fill(password);
    await this.rePasswordField.fill(rePassword);
    await expect(this.registerButton).toBeEnabled();
    await this.registerButton.click();
	  await expect(this.page).toHaveURL(RegistrationForm.URL);
  };

  async assertPasswordMismatch(password: string, rePassword: string) {
    await this.passwordField.fill(password);
    await this.rePasswordField.fill(rePassword);
    await this.rePasswordField.blur();
    await expect(this.errorMessages).toContainText("Passwords do not match");
  }
  
}
