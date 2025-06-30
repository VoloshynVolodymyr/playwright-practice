import { expect, Locator } from '@playwright/test';
import BasePage from "../pages/BasePage";

export default class SignInForm extends BasePage {
	static readonly URL = 'https://qauto.forstudy.space/panel/garage';

	get emailField(): Locator {
		return this.page.locator("//input[@id='signinEmail']");
	  }

	get passwordField(): Locator {
		return this.page.locator("//input[@id='signinPassword']");
	}

	get submitSignInForm(): Locator {
		return this.page.locator("//app-signin-modal//button[contains(text(), 'Login')]");
	}

	async fillSignInFormWithValidCredentials(email: string, password: string) {
		await this.emailField.fill(email);
		await this.passwordField.fill(password);
		await this.submitSignInForm.click();
		await expect(this.page).toHaveURL(SignInForm.URL);
	}
}