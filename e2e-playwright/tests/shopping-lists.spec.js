const { test, expect } = require("@playwright/test");

// Add shopping list
test("Can add a shopping list", async ({ page }) => {
  await page.goto("/lists");

  await page.locator("input[type=text]").type("Shopping List 1");

  await page.locator("input[type=submit][value='Submit!']").click();

  await page.waitForSelector("a:has-text('Shopping List 1')");

  const newListLocator = page.locator("a", { hasText: "Shopping List 1" })
    .first();
  await expect(newListLocator).toBeVisible();
});

// View shopping list
test("View shopping list", async ({ page }) => {
  await page.goto("/lists");

  await page.locator("input[type=text]").fill("Shopping List 1");

  await page.locator("input[type=submit][value='Submit!']").click();

  await page.waitForSelector("a:has-text('Shopping List 1')");

  const newListLocator = page.locator("a", { hasText: "Shopping List 1" }).first();
  await expect(newListLocator).toBeVisible();

  await Promise.all([
    page.waitForURL(),
    newListLocator.click(),
  ]);

  await expect(page).toHaveURL(/\/lists\/\d+/);
});

// Add items
test("Add Item", async ({ page }) => {
  await page.goto("/lists/1");

  await page.locator("input[type=text]").fill("Item 1");
  await page.locator("input[type=submit][value='Add Items!']").click();

  const newItemLocator = page.locator("td", { hasText: "Item 1" }).first();
  await expect(newItemLocator).toBeVisible();
});

// Mark collected
test("Mark collected item", async ({ page }) => {
  await page.goto("/lists/1");
  await page.locator("input[type=submit][value='Mark Collected!']").first().click();
  
  const newItemLocator = page.locator("del", { hasText: "Item 1" }).first();
  await expect(newItemLocator).toBeVisible();
});


// Deactivate shopping list
test("Deactivate Shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=submit][value='Deactivate list!']").first().click();
  
  const newListLocator = page.locator("a", { hasText: "Shopping List 1" }).first();
  await expect(newListLocator).toBeEmpty;
});
