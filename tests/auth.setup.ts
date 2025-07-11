import { expect, test as setup } from "@playwright/test";
import SignInForm from "../pom/forms/SignInForm";
import HomePage from "../pom/pages/HomePage";
import GaragePage from "../pom/pages/GaragePage";

const authFile = ".auth/user.json";

setup("Authenticate user with saving storage state", async ({ browser }) => {
  console.log("USERNAME:", process.env.HTTP_CREDENTIALS_USERNAME);
console.log("PASSWORD:", process.env.HTTP_CREDENTIALS_PASSWORD);
  const context = await browser.newContext({
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME! || 'guest',
      password: process.env.HTTP_CREDENTIALS_PASSWORD! || 'welcome2qauto',
    },
  });
  const page = await context.newPage();

  const signInForm = new SignInForm(page);
  const homePage = new HomePage(page);
  const garagePage = new GaragePage(page);

  await homePage.open();
  await homePage.openSignInForm();

  await expect(signInForm.emailField).toBeVisible();
  await expect(signInForm.passwordField).toBeVisible();

  await signInForm.fillSignInFormWithValidCredentials(
    process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!
  );

  await expect(page).toHaveURL(GaragePage.URL);
  expect(await garagePage.pageTitle).toContain("Hillel Qauto");

  await page.context().storageState({ path: authFile });

  await context.close();
});
