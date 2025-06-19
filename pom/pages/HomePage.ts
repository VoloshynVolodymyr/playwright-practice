import BasePage from '../pages/BasePage';

export default class HomePage extends BasePage{
	get signUpButton() {
		return this.page.getByRole('button', { name: 'Sign up' });
	}

	async open() {
		await this.page.goto('/');
	}

	async openRegistrationForm() {
		await this.signUpButton.click();
	}
}