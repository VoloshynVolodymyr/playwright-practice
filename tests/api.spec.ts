import test, { expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import AuthController from "../API/controllers/AuthController";
import CarController from "../API/controllers/CarController";

let homePage: HomePage;
let signInForm: SignInForm;
let authController: AuthController;
let carController: CarController;

test.describe("Mocking response", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
  });

  test("Mock response", async ({ page }) => {
    await homePage.open();
    await homePage.openSignInForm();

    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200, //
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 172244,
            photoFilename: "default-user.png",
            name: "Hillel",
            lastName: "Auto",
          },
        }),
      });
    });

    await signInForm.fillSignInFormWithValidCredentials(
      process.env.USER_EMAIL!,
      process.env.USER_PASSWORD!
    );
    await expect(page.getByText("Garage").first()).toBeVisible();
    await page
      .locator(
        '//a[@href="/panel/profile"][@class ="btn btn-white btn-sidebar sidebar_btn -profile"]'
      )
      .click();
    await expect(page.locator("p.profile_name.display-4")).toHaveText(
      "Hillel Auto"
    );
  });
});

test.describe("API requests - positive", () => {
  let sid: string;
  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    sid = await authController.getAuthCookie(
      process.env.USER_EMAIL!,
      process.env.USER_PASSWORD!
    );
  });
  
  test("Adding new car", async ({ request }) => {
    carController = new CarController(request);

    const response = await carController.addNewCar(4, 16, 555, sid);

    expect(response.status).toBe("ok");
    expect(response.data!.carBrandId).toBe(4);
    expect(response.data!.brand).toBe("Porsche");
    expect(response.data!.model).toBe("911");
  });

  test("Updating last car", async ({ request }) => {
    carController = new CarController(request);
    let lastAddedCar = await carController.getLastAddedCar(sid);

    let lastAddedCarId = lastAddedCar.id;
    let lastAddedCarMileage = lastAddedCar.mileage;

    let response = await carController.updateCar(lastAddedCarId, 1, 3, lastAddedCarMileage+1, sid);

    expect(response.status).toBe("ok");
    expect(response.data!.mileage).toEqual(++lastAddedCarMileage);
  });

  test("Removing last car", async ({ request }) => {
    carController = new CarController(request);
    let lastAddedCar = await carController.getLastAddedCar(sid);
    let lastAddedCarId = lastAddedCar.id;

    let response = await carController.deleteCar(lastAddedCarId, sid);

    expect(response.status).toBe("ok");
    expect(response.data!.carId).toEqual(lastAddedCarId);
  });
});

test.describe("API requests - negative", () => {
  let sid: string;
  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    sid = await authController.getAuthCookie(
      process.env.USER_EMAIL!,
      process.env.USER_PASSWORD!
    );
  });

  test("Adding new car with non-exist carBrandId", async ({ request }) => {
    carController = new CarController(request);

    const response = await carController.addNewCar(11, 16, 555, sid);

    expect(response.status).toBe("error");
    expect(response.message).toBe("Brand not found");
  });

  test("Updating last car with mileage less than current", async ({ request }) => {
    carController = new CarController(request);
    let lastAddedCar = await carController.getLastAddedCar(sid);

    let lastAddedCarId = lastAddedCar.id;
    let lastAddedCarMileage = lastAddedCar.mileage;

    let response = await carController.updateCar(lastAddedCarId, 1, 3, lastAddedCarMileage-1, sid);

    expect(response.status).toBe("error");
    expect(response.message).toBe("New mileage is less then previous entry");
  });

  test("Removing last car with non-correct carId", async ({ request }) => {
    carController = new CarController(request);
    let lastAddedCar = await carController.getLastAddedCar(sid);
    let lastAddedCarId = lastAddedCar.id + 1;

    let response = await carController.deleteCar(lastAddedCarId, sid);

    expect(response.status).toBe("error");
    expect(response.message).toBe(`Car with id ${++lastAddedCar.id} not found`);
  });

})
