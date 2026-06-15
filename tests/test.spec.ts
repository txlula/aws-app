import { test, expect } from "@playwright/test";

const url =
  "http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy";

test.describe("testing website header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("displays the correct title", async ({ page }) => {
    await expect(page.getByTestId("pageTitle")).toBeVisible();
    await expect(page.getByTestId("pageTitle")).toHaveText(
      "Daily Mood Checker",
    );
  });

  test("displays the correct description", async ({ page }) => {
    await expect(page.getByTestId("description")).toBeVisible();
    await expect(page.getByTestId("description")).toHaveText(
      "It is time to track your daily mood and feelings.",
    );
  });
});

test.describe("testing website content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("displays the body", async ({ page }) => {
    await expect(page.getByTestId("body")).toBeVisible();
  });

  test("displays the instructions", async ({ page }) => {
    await expect(page.getByTestId("instructions")).toBeVisible();
  });

  test("displays the correct questions", async ({ page }) => {
    await expect(page.getByTestId("moodForm")).toBeVisible();
    await expect(page.getByTestId("moodForm")).toContainText(
      "How are you feeling today?",
    );
    await expect(page.getByTestId("moodForm")).toContainText(
      "What is the reason for your mood?",
    );
    await expect(page.getByTestId("moodForm")).toContainText(
      "What is your energy level today?",
    );
    await expect(page.getByTestId("moodForm")).toContainText(
      "What is something you are grateful for today?",
    );
    await expect(page.getByTestId("moodForm")).toContainText(
      "What is something you want to accomplish tomorrow?",
    );
    await expect(page.getByTestId("moodForm")).toContainText(
      "Any additional ideas or thoughts?",
    );
  });
});

test.describe("testing form submission", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("allows the user to submit the form with a happy mood", async ({
    page,
  }) => {
    await page.getByTestId("happy").check();
    await expect(page.getByTestId("happy")).toBeChecked();

    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "src",
      "images/happy face.png",
    );
    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "alt",
      "Happy Face",
    );

    await page.getByTestId("reasonInput").fill("I had a great day at work!");
    await expect(page.getByTestId("reasonInput")).toHaveValue(
      "I had a great day at work!",
    );

    await page.getByTestId("energyLevel").fill("80");
    await expect(page.getByTestId("energyLevel")).toHaveValue("80");
    await expect(page.getByTestId("energyLevelValue")).toHaveText("80");

    await page
      .getByTestId("gratefulInput")
      .fill("I am grateful for my supportive friends and family.");
    await expect(page.getByTestId("gratefulInput")).toHaveValue(
      "I am grateful for my supportive friends and family.",
    );

    await page
      .getByTestId("goalInput")
      .fill("I want to go for a run tomorrow.");
    await expect(page.getByTestId("goalInput")).toHaveValue(
      "I want to go for a run tomorrow.",
    );

    await page
      .getByTestId("additionalInput")
      .fill("I am looking forward to the weekend!");
    await expect(page.getByTestId("additionalInput")).toHaveValue(
      "I am looking forward to the weekend!",
    );

    await page.getByTestId("submitButton").click();

    await expect(page.getByTestId("resultsDialog")).toBeVisible();
    await expect(page.getByTestId("resultsDialogTitle")).toHaveText(
      "Submission Results",
    );
    await expect(page.getByTestId("score")).toHaveText("Your score: 90.00");
    await expect(page.getByTestId("resultsContent")).toHaveText(
      "Great job! You are doing well. Appreciate the work you have done today and keep it up!",
    );

    await page.getByTestId("closeDialogButton").click();
    await expect(page.getByTestId("resultsDialog")).not.toBeVisible();
  });

  test("allows the user to submit the form with a neutral mood", async ({
    page,
  }) => {
    await page.getByTestId("neutral").check();
    await expect(page.getByTestId("neutral")).toBeChecked();

    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "src",
      "images/neutral face.png",
    );
    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "alt",
      "Neutral Face",
    );

    await page.getByTestId("reasonInput").fill("It was an average day.");
    await expect(page.getByTestId("reasonInput")).toHaveValue(
      "It was an average day.",
    );

    await page.getByTestId("energyLevel").fill("50");
    await expect(page.getByTestId("energyLevel")).toHaveValue("50");
    await expect(page.getByTestId("energyLevelValue")).toHaveText("50");

    await page
      .getByTestId("gratefulInput")
      .fill("I am grateful for my health.");
    await expect(page.getByTestId("gratefulInput")).toHaveValue(
      "I am grateful for my health.",
    );

    await page
      .getByTestId("goalInput")
      .fill("I want to go for a walk tomorrow.");
    await expect(page.getByTestId("goalInput")).toHaveValue(
      "I want to go for a walk tomorrow.",
    );

    await page.getByTestId("additionalInput").fill("I am feeling tired.");
    await expect(page.getByTestId("additionalInput")).toHaveValue(
      "I am feeling tired.",
    );

    await page.getByTestId("submitButton").click();

    await expect(page.getByTestId("resultsDialog")).toBeVisible();
    await expect(page.getByTestId("resultsDialogTitle")).toHaveText(
      "Submission Results",
    );
    await expect(page.getByTestId("score")).toHaveText("Your score: 50.00");
    await expect(page.getByTestId("resultsContent")).toHaveText(
      "Not bad! Keep it up. Remember to take breaks and do something you enjoy to boost your mood and energy.",
    );

    await page.getByTestId("closeDialogButton").click();
    await expect(page.getByTestId("resultsDialog")).not.toBeVisible();
  });

  test("allows the user to submit the form with a sad mood", async ({
    page,
  }) => {
    await page.getByTestId("sad").check();
    await expect(page.getByTestId("sad")).toBeChecked();

    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "src",
      "images/sad face.png",
    );
    await expect(page.getByTestId("moodImage")).toHaveAttribute(
      "alt",
      "Sad Face",
    );

    await page.getByTestId("reasonInput").fill("I had a rough day.");
    await expect(page.getByTestId("reasonInput")).toHaveValue(
      "I had a rough day.",
    );

    await page.getByTestId("energyLevel").fill("20");
    await expect(page.getByTestId("energyLevel")).toHaveValue("20");
    await expect(page.getByTestId("energyLevelValue")).toHaveText("20");

    await page
      .getByTestId("gratefulInput")
      .fill("I am grateful for my family.");
    await expect(page.getByTestId("gratefulInput")).toHaveValue(
      "I am grateful for my family.",
    );

    await page.getByTestId("goalInput").fill("I want to rest tomorrow.");
    await expect(page.getByTestId("goalInput")).toHaveValue(
      "I want to rest tomorrow.",
    );

    await page.getByTestId("additionalInput").fill("I am feeling sad.");
    await expect(page.getByTestId("additionalInput")).toHaveValue(
      "I am feeling sad.",
    );

    await page.getByTestId("submitButton").click();

    await expect(page.getByTestId("resultsDialog")).toBeVisible();
    await expect(page.getByTestId("resultsDialogTitle")).toHaveText(
      "Submission Results",
    );
    await expect(page.getByTestId("score")).toHaveText("Your score: 10.00");
    await expect(page.getByTestId("resultsContent")).toHaveText(
      "It seems like you're having a tough day. Consider taking a break or doing something you enjoy.",
    );

    await page.getByTestId("closeDialogButton").click();
    await expect(page.getByTestId("resultsDialog")).not.toBeVisible();
  });
});

test.describe("testing form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("should not allow user to input more than 1000 characters in the additional thoughts textarea", async ({
    page,
  }) => {
    const longText = "a".repeat(1001);

    await expect(page.getByTestId("additionalInput")).toHaveAttribute(
      "maxlength",
      "1000",
    );
    await page.getByTestId("additionalInput").fill(longText);
    await expect(page.getByTestId("additionalInput")).toHaveValue(
      "a".repeat(1000),
    );
  });

  test("should not allow user to input less than 0 or more than 100 in the energy level input", async ({
    page,
  }) => {
    await expect(page.getByTestId("energyLevel")).toHaveAttribute("min", "0");
    await expect(page.getByTestId("energyLevel")).toHaveAttribute("max", "100");

    await page.getByTestId("energyLevel").fill("0");
    await expect(page.getByTestId("energyLevel")).toHaveValue("0");

    await page.getByTestId("energyLevel").fill("100");
    await expect(page.getByTestId("energyLevel")).toHaveValue("100");
  });
});

test.describe("testing ui on mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test("should have no horizontal scroll on mobile", async ({ page }) => {
    await expect(page.getByTestId("body")).not.toHaveCSS(
      "overflow-x",
      "scroll",
    );
  });
});

test.describe("testing css styles", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("should have the correct background colour", async ({ page }) => {
    await expect(page.getByTestId("body")).toHaveCSS(
      "background-color",
      "rgb(255, 250, 205)",
    );
  });

  test("should have the correct font family", async ({ page }) => {
    await expect(page.getByTestId("body")).toHaveCSS(
      "font-family",
      "sans-serif",
    );
  });

  test("should align the text to the center", async ({ page }) => {
    await expect(page.getByTestId("pageTitle")).toHaveCSS(
      "text-align",
      "center",
    );
    await expect(page.getByTestId("description")).toHaveCSS(
      "text-align",
      "center",
    );
    await expect(page.getByTestId("moodForm")).toHaveCSS(
      "text-align",
      "center",
    );
  });
});
