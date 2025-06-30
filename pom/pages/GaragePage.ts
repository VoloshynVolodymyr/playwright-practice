import { Locator, Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class GaragePage extends BasePage {
  static readonly URL = "https://qauto.forstudy.space/panel/garage";
  private readonly addCarButton: Locator = this.page.locator(
    "//button[contains(text(), 'Add car')]"
  );
  private readonly editCarButtons: Locator = this.page.locator(
    '//span[@class="icon icon-edit"]'
  );
  private readonly removeCarButton: Locator = this.page.locator(
    '//button[contains(text(), "Remove car")]'
  );
  private readonly submitRemoveCar: Locator = this.page.locator(
    '//app-remove-car-modal//button[contains(text(), "Remove")]'
  );

  get pageTitle(): Promise<any> {
    return this.page.title();
  }

  public get garagePage(): Page {
    return this.page;
  }

  async open(): Promise<void> {
    await this.page.goto("https://qauto.forstudy.space/panel/garage");
  }

  async openAddCarForm(): Promise<void> {
    await this.addCarButton.click();
  }

  async removeCar(): Promise<void> {
    await this.editCarButtons.first().click();
    await this.removeCarButton.click();
    await this.submitRemoveCar.click();
  }
}
