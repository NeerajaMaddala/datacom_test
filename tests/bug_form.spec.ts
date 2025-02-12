import { test, expect, Page,Browser } from '@playwright/test';
import { faker } from '@faker-js/faker';

type user = {
  firstName:string,
  lastName:string,
  phone:string,
  country:string,
  emailAddress:string,
  password:string
}

var regUser:user;

let page: Page;
test.beforeAll('User is Able to register entering valid data on all fields',async ({browser}) => {
  page = await browser.newPage();
  await page.goto('https://qa-practice.netlify.app/bugs-form');
  regUser = {
    country:"New Zealand",
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    phone:faker.phone.number(),
    emailAddress:faker.internet.email(),
    password:faker.internet.password()
  }
 
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("QA Practice | Learn with RV");
  await page.fill("#firstName",regUser.firstName)
  await page.fill("#lastName",regUser.lastName)
  await page.fill("#phone",regUser.phone)
  await page.selectOption("#countries_dropdown_menu",regUser.country)
  await page.fill("#emailAddress",regUser.emailAddress)
  await page.fill("#password",regUser.password)
  //await page.check("#exampleCheck1") // check for terms and conditions remove commend once the checkbox is enable 
  await page.click("#registerBtn")
  await expect(page.locator("#message")).toHaveText("Successfully registered the following information")
})

test('User firstName is displayed on success section', async () => {
  await expect(page.locator("#resultFn")).toHaveText("First Name: "+regUser.firstName)
});

test('User lastName is displayed on success section', async () => {
  await expect(page.locator("#resultLn")).toHaveText("Last Name: "+regUser.lastName)
});

test('User phone is displayed on success section', async () => {
  await expect(page.locator("#resultPhone")).toHaveText("Phone Number: "+regUser.phone)
});

test('User email is displayed on success section', async () => {
  await expect(page.locator("#resultEmail")).toHaveText("Email: "+regUser.emailAddress)
});

test('User Country is displayed on success section', async () => {
  await expect(page.locator("#country")).toHaveText("Country: "+regUser.country)
});

test.afterAll(async () => {
  await page.close();
});
