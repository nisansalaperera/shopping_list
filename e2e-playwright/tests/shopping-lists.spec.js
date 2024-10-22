const { test, expect } = require("@playwright/test");

// Add shopping list
test("Can add a shopping list", async ({ page }) => {
  
  const randomListName = `Shopping List ${Math.floor(Math.random() * 10000)}`;

  await page.goto("/lists");

  await page.locator("input[type=text]").type(randomListName);

  await page.locator("input[type=submit][value='Submit!']").click();

  await page.waitForSelector(`a:has-text('${randomListName}')`);

  const newListLocator = page.locator(`a:has-text('${randomListName}')`).first();
  await expect(newListLocator).toBeVisible();
});

// View shopping list
test("View shopping list", async ({ page }) => {
  
  const randomListName = `Shopping List ${Math.floor(Math.random() * 10000)}`;

  await page.goto("/lists");

  await page.locator("input[type=text]").fill(randomListName);

  await page.locator("input[type=submit][value='Submit!']").click();

  await page.waitForSelector(`a:has-text('${randomListName}')`);

  const newListLocator = page.locator(`a:has-text('${randomListName}')`).first();
  await expect(newListLocator).toBeVisible();

  await Promise.all([
    page.waitForURL(),
    newListLocator.click(),
  ]);

  await expect(page).toHaveURL(/\/lists\/\d+/);
});

// Add items
test("Add Item", async ({ page }) => {

  const randomListName = `Shopping List ${Math.floor(Math.random() * 10000)}`;
  const randomItemName = `Item ${Math.floor(Math.random() * 10000)}`;

  await page.goto("/lists");

  await page.locator("input[type=text]").fill(randomListName);

  await page.locator("input[type=submit][value='Submit!']").click();

  const newListLocator = page.locator(`a:has-text('${randomListName}')`).first();

  // Get the link and get the ID of the list
  const hrefValue = await newListLocator.getAttribute('href');

  const lastPartOfUrl = hrefValue.split("/").pop();

  await page.goto(`/lists/${lastPartOfUrl}`);

  await page.locator("input[type=text]").fill(`${randomItemName}`);
  await page.locator("input[type=submit][value='Add Items!']").click();

  const newItemLocator = page.locator("td", { hasText: `${randomItemName}` }).first();
  await expect(newItemLocator).toBeVisible();
});

// Mark collected
test("Mark collected item", async ({ page }) => {

  const randomListName = `Shopping List ${Math.floor(Math.random() * 10000)}`;
  const randomItemName = `Item ${Math.floor(Math.random() * 10000)}`;

  await page.goto("/lists");

  await page.locator("input[type=text]").fill(randomListName);

  await page.locator("input[type=submit][value='Submit!']").click();

  const newListLocator = page.locator(`a:has-text('${randomListName}')`).first();

  // Get the link and get the ID of the list
  const hrefValue = await newListLocator.getAttribute('href');

  const lastPartOfUrl = hrefValue.split("/").pop();

  await page.goto(`/lists/${lastPartOfUrl}`);

  await page.locator("input[type=text]").fill(`${randomItemName}`);
  await page.locator("input[type=submit][value='Add Items!']").click();

  const newItemLocator = page.locator("td", { hasText: `${randomItemName}` }).first();
  await expect(newItemLocator).toBeVisible();

  await page.goto(`/lists/${lastPartOfUrl}`);
  await page.locator("input[type=submit][value='Mark Collected!']").first().click();
  
  const markedItemLocator = page.locator("del", { hasText: `${randomItemName}` }).first();
  await expect(markedItemLocator).toBeVisible();
});


// Deactivate shopping list
test("Deactivate Shopping list", async ({ page }) => {
  const randomListName = `Shopping List ${Math.floor(Math.random() * 10000)}`;

  await page.goto("/lists");

  await page.locator("input[type=text]").type(randomListName);

  await page.locator("input[type=submit][value='Submit!']").click();

  await page.waitForSelector(`a:has-text('${randomListName}')`);

  const newListLocator = page.locator(`a:has-text('${randomListName}')`).first();
  await expect(newListLocator).toBeVisible();

  await page.locator("input[type=submit][value='Deactivate list!']").first().click();
  
  const deactivatedListLocator = page.locator(`a:has-text('${randomListName}')`).first();
  await expect(deactivatedListLocator).toBeEmpty;
});
