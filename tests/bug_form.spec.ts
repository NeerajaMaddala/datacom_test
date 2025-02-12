import { test, expect, Page,Browser } from '@playwright/test';
import { faker } from '@faker-js/faker';
// Creater user Type to store user data 
type user = {
  firstName:string,
  lastName:string,
  phone:string,
  country:string,
  emailAddress:string,
  password:string
}

// declare regUser global variable to reuse this object across multiple tests 
var regUser:user;
//declare page object as global varialbe to use the same browser session across mulitple tests 
let page: Page;

test.beforeAll('User is Able to register entering valid data on all fields',async ({browser}) => {
  //Initializing global variables 
  page = await browser.newPage();  //Initializing browser  
  regUser = { //initializing regUser using faker data to have different data samples on every test execution 
    country:"New Zealand",
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    phone:faker.phone.number(),
    emailAddress:faker.internet.email(),
    password:faker.internet.password()
  }
  
  //Open bug form page 
  await page.goto('https://qa-practice.netlify.app/bugs-form');  
  await expect(page).toHaveTitle("QA Practice | Learn with RV");

  //Fill the form 
  await page.fill("#firstName",regUser.firstName)
  await page.fill("#lastName",regUser.lastName)
  await page.fill("#phone",regUser.phone)
  await page.selectOption("#countries_dropdown_menu",regUser.country)
  await page.fill("#emailAddress",regUser.emailAddress)
  await page.fill("#password",regUser.password)
  //await page.check("#exampleCheck1") // check for terms and conditions remove commend once the checkbox is enable 
  await page.click("#registerBtn")
  //verify user is registered
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
