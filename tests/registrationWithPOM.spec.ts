import { test } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import RegistrationForm from "../pom/forms/RegistrationForm";

let homePage: HomePage;
let registrationForm: RegistrationForm;

test.describe("Registration form tests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationForm = new RegistrationForm(page);
    await homePage.open();
    await homePage.openRegistrationForm();
  });

  test.describe("Testing registration form with empty fields", () => {
    test("name field is empty", async () => {
      await registrationForm.triggerErrorOnEmptyField(
        registrationForm.userNameField,
        registrationForm.errorMessages,
        "Name required"
      );
    });

    test("last name field is empty", async () => {
      await registrationForm.triggerErrorOnEmptyField(
        registrationForm.userLastNameField,
        registrationForm.errorMessages,
        "Last name required"
      );
    });

    test("email field is empty", async () => {
      await registrationForm.triggerErrorOnEmptyField(
        registrationForm.userEmailField,
        registrationForm.errorMessages,
        "Email required"
      );
    });

    test("password field is empty", async () => {
      await registrationForm.triggerErrorOnEmptyField(
        registrationForm.passwordField,
        registrationForm.errorMessages,
        "Password required"
      );
    });

    test("re-password field is empty", async () => {
      await registrationForm.triggerErrorOnEmptyField(
        registrationForm.rePasswordField,
        registrationForm.errorMessages,
        "Re-enter password required"
      );
    });
  });

  test.describe("Testing registration form with wrong data", () => {
    test("name field with wrong data", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.userNameField,
        "#$%",
        registrationForm.errorMessages,
        "Name is invalid"
      );
    });

    test("last name field with wrong data", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.userLastNameField,
        "#$%",
        registrationForm.errorMessages,
        "Last name is invalid"
      );
    });

    test("email field with wrong data", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.userEmailField,
        "#$%",
        registrationForm.errorMessages,
        "Email is incorrect"
      );
    });

    test("password field with wrong data", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.passwordField,
        "#$%",
        registrationForm.errorMessages,
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("re-password field with wrong data", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.rePasswordField,
        "#$%",
        registrationForm.errorMessages,
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("password and rePassword fields are mismatch", async () => {
      await registrationForm.assertPasswordMismatch("Password1", "Password2");
    });
  });

  test.describe("Testing registration form with wrong length", () => {
    test("name field with too short length", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.userNameField,
        "A",
        registrationForm.errorMessages,
        "Name has to be from 2 to 20 characters long"
      );
    });

    test("last name field with too long length", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.userLastNameField,
        "AAAAAaaaaaAAAAAaaaaaAa",
        registrationForm.errorMessages,
        "Last name has to be from 2 to 20 characters long"
      );
    });

    test("password field with too short length", async () => {
      await registrationForm.fillFieldWithWrongData(
        registrationForm.passwordField,
        "A",
        registrationForm.errorMessages,
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });
  });

  test.describe("Testing registration form with correct credentials", () => {
    test("all fields are filled with correct credentials", async () => {
      const uniqueEmail = `aqa-vva1979+${Date.now()}@ukr.net`;
      await registrationForm.fillAllFieldsWithCorrectData(
        "Volodymyr",
        "Voloshyn",
        uniqueEmail,
        "Password1",
        "Password1"
      );
    });
  });
});
