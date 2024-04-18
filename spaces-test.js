const { Builder, By, Key } = require("selenium-webdriver");
require("chromedriver");


//wait function
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// userJourney function
async function querySearch() {
  var searchString = "Bedsheets";
  var pincode = "560064";

  let driver = await new Builder().forBrowser("chrome").build();

  try {

    await driver.get("https://www.spaces.in/");

    await driver.findElement(By.xpath("//details[@class='header__search-container disclosure-has-popup']//summary[@aria-label='Search']//*[name()='svg']")).click();

    await driver.findElement(By.xpath("//div[@class='header__search']//input[@id='Search-In-Modal-header']")).sendKeys(searchString, Key.RETURN);

    await driver.findElement(By.xpath("//a[@title='Hygro Cotton Bedsheets Large']")).click();

    // quantity selector

    let quantityInc = await driver.findElement(By.css("button.quantity__button[name='plus']"));
    for (let i = 0; i < 2; i++) {
      await quantityInc.click();
    }
    await wait(2000);
    await driver.findElement(By.css("button.quantity__button[name='minus']")).click();

    await wait(2000);

    // product pin code

    await driver.findElement(By.id("pincodeInput")).click();
    await wait(2000);
    await driver.findElement(By.id("pincodeInput")).sendKeys(pincode, Key.RETURN);
    await wait(2000);
    await driver.findElement(By.id("pinSubmit")).click();
    await wait(2000);


    // wishlist
    await driver.findElement(By.className("wishlist-engine-button")).click();
    await wait(2000);

    // ATC Btn
    await driver.findElement(By.css("button.addbtn")).click();
    await wait(2000);

    // checkout action
    await driver.findElement(By.xpath("//button[@name='checkout']")).click();
    await wait(2000);


    var title = await driver.getTitle();
    console.log('spaces welspun titile:', title);

  } catch (error) {

    console.error('Error occurred:', error);
  } finally {

    // await driver.quit();
  }
}

querySearch();
