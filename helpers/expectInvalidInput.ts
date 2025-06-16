import { expect, Locator } from '@playwright/test';
const INVALID_BORDER_COLOR = 'rgb(220, 53, 69)';
export async function expectInvalidInput(input: Locator, error: Locator, message: string, registerButton: Locator) {
	await expect(error).toContainText(message);
	await expect(input).toHaveCSS('border-color', INVALID_BORDER_COLOR);
	await expect(registerButton).toBeDisabled();
  }
  