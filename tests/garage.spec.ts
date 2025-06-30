import { test } from "../fixtures/garage";

test("Test with fixture: adding and removing car on garage page", async ({
  userGaragePage,
}) => {
  const removedCar = await userGaragePage.garagePage
    .locator("//app-car//p[@class='car_name h2']")
    .first()
    .textContent();
  console.log(`You've just removed car : ${removedCar}`);
});
