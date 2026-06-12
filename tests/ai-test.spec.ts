import { test, expect, devices } from '@playwright/test';

const URL =
  'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe('Testing Website Header', () => {
  test('displays the correct title', async ({ page }) => {
    await expect(page.getByTestId('pageTitle')).toHaveText(
      'Daily Mood Checker'
    );
  });

  test('displays the correct description', async ({ page }) => {
    await expect(page.getByTestId('description')).toHaveText(
      'It is time to track your daily mood and feelings.'
    );
  });
});

test.describe('Testing Website Content', () => {
  test('displays the body', async ({ page }) => {
    await expect(page.getByTestId('body')).toBeVisible();
  });

  test('displays the instructions', async ({ page }) => {
    await expect(page.getByTestId('instructions')).toBeVisible();
  });

  test('displays the correct instructions', async ({ page }) => {
    await expect(page.getByTestId('instructions')).toContainText(
      'Choose your mood'
    );

    await expect(page.getByTestId('instructions')).toContainText(
      'Explain your mood'
    );

    await expect(page.getByTestId('instructions')).toContainText(
      'Set your energy level'
    );

    await expect(page.getByTestId('instructions')).toContainText(
      'Submit your form'
    );
  });
});

test.describe('Testing Form Submission', () => {
  test('allows the user to submit a positive review', async ({ page }) => {
    await page.getByTestId('happy').check();

    await page.getByTestId('reasonInput').fill(
      'I had an amazing day with friends.'
    );

    await page.getByTestId('gratefulInput').fill('My family');
    await page.getByTestId('goalInput').fill('Go for a run tomorrow');

    await page.getByTestId('additionalInput').fill(
      'Feeling very positive today.'
    );

    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('resultsDialog')).toBeVisible();
    await expect(page.getByTestId('resultsDialogTitle')).toHaveText(
      'Submission Results'
    );
  });

  test('allows the user to submit a neutral review', async ({ page }) => {
    await page.getByTestId('neutral').check();

    await page.getByTestId('reasonInput').fill(
      'Today was an average day.'
    );

    await page.getByTestId('gratefulInput').fill('Having food');
    await page.getByTestId('goalInput').fill('Finish reading a chapter');

    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('resultsDialog')).toBeVisible();
  });

  test('allows the user to submit a negative review', async ({ page }) => {
    await page.getByTestId('sad').check();

    await page.getByTestId('reasonInput').fill(
      'I am feeling tired and stressed.'
    );

    await page.getByTestId('gratefulInput').fill('Supportive friends');
    await page.getByTestId('goalInput').fill('Get more rest');

    await page.getByTestId('submitButton').click();

    await expect(page.getByTestId('resultsDialog')).toBeVisible();
  });
});

test.describe('Testing Form Validation', () => {
  test('should not allow the user to input more than 1000 characters in the additional thoughts textarea', async ({
    page,
  }) => {
    const textarea = page.getByTestId('additionalInput');

    const longText = 'a'.repeat(1200);

    await textarea.fill(longText);

    const value = await textarea.inputValue();

    expect(value.length).toBeLessThanOrEqual(1000);
  });

  test('should not allow user to input less than 0 or more than 100 in the energy level input', async ({
    page,
  }) => {
    const slider = page.getByTestId('energyLevel');

    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '-10';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const minValue = await slider.inputValue();
    expect(Number(minValue)).toBeGreaterThanOrEqual(0);

    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '150';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const maxValue = await slider.inputValue();
    expect(Number(maxValue)).toBeLessThanOrEqual(100);
  });
});

test.describe('Testing UI on Mobile', () => {
  test('should have no horizontal scroll on mobile', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth >
        document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });
});

test.describe('Testing CSS Styles', () => {
  test('should have the correct background colour', async ({ page }) => {
    const backgroundColor = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // lemonchiffon = rgb(255, 250, 205)
    expect(backgroundColor).toBe('rgb(255, 250, 205)');
  });

  test('should have the correct font family', async ({ page }) => {
    const fontFamily = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    expect(fontFamily.toLowerCase()).toContain('sans-serif');
  });

  test('should align the text to the center', async ({ page }) => {
    const titleAlignment = await page
      .getByTestId('pageTitle')
      .evaluate((el) => {
        return window.getComputedStyle(el).textAlign;
      });

    expect(titleAlignment).toBe('center');
  });
});
