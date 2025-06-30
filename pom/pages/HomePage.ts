import BasePage from '../pages/BasePage';

export default class HomePage extends BasePage{
	get signUpButton() {
		return this.page.getByRole('button', { name: 'Sign up' });
	}

	get signInButton() {
		return this.page.getByRole('button', { name: 'Sign In' });
	}

	async open() {
		await this.page.goto('/');
	}

	async openRegistrationForm() {
		await this.signUpButton.click();
	}
	
	async openSignInForm() {
		await this.signInButton.click();
	}
}