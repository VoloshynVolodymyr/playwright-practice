import { test as base, expect } from "@playwright/test";
import GaragePage from "../pom/pages/GaragePage";
import AddCarForm from "../pom/forms/AddCarForm";

type PageFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<PageFixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/user.json",
    });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    const addCarForm = new AddCarForm(page);

    await garagePage.open();
    await garagePage.openAddCarForm();
    await addCarForm.addCar("Audi", "Q7", "777");

    await expect(
      page.locator("//app-car//p[@class='car_name h2'][contains(., 'Audi Q7')]")
    ).toBeVisible();

    await use(garagePage);

    await garagePage.removeCar();

    await expect(
      page.locator("//app-car//p[@class='car_name h2'][contains(., 'Audi Q7')]")
    ).not.toBeVisible();

    await context.close();
  },
});

export { expect } from "@playwright/test";
