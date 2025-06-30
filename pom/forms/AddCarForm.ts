import { Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class AddCarForm extends BasePage {
  private readonly brandField: Locator = this.page.locator(
    "//select[@id='addCarBrand']"
  );
  private readonly modelField: Locator = this.page.locator(
    "//select[@id='addCarModel']"
  );
  private readonly mileageField: Locator = this.page.locator(
    "//input[@id='addCarMileage']"
  );
  private readonly submitAddCarForm: Locator = this.page.locator(
    "//app-add-car-modal//button[@class='btn btn-primary']"
  );

  async addCar(brand: string, model: string, mileage: string): Promise<void> {
    await this.brandField.selectOption(brand);
    await this.modelField.selectOption(model);
    await this.mileageField.fill(mileage);
    await this.submitAddCarForm.click();
    console.log(`You've just added car : ${brand} ${model}`);
  }
}
