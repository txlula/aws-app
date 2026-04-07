const url =
  "http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy";

describe("testing website header", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("displays the correct title", () => {
    cy.title().should("eq", "Daily Mood Checker");
    cy.get("h1").should("contain", "Daily Mood Checker");
  });

  it("displays the correct description", () => {
    cy.get("#description").should(
      "contain",
      "It is time to track your daily mood and feelings.",
    );
  });
});

describe("testing website content", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("displays the body", () => {
    cy.get("body").should("be.visible");
  });

  it("displays the correct questions", () => {
    cy.get("#moodForm").should("contain", "How are you feeling today?");
    cy.get("#moodForm").should("contain", "What is the reason for your mood?");
    cy.get("#moodForm").should("contain", "What is your energy level today?");
    cy.get("#moodForm").should(
      "contain",
      "What is something you are grateful for today?",
    );
    cy.get("#moodForm").should(
      "contain",
      "What is something you want to accomplish tomorrow?",
    );
    cy.get("#moodForm").should("contain", "Any additional ideas or thoughts?");
  });
});

describe("testing form submission", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("allows the user to submit the form with a happy mood", () => {
    cy.get("#happy").check();
    cy.get("#happy").should("be.checked");

    cy.get("#moodImage")
      .should("have.attr", "src")
      .and("include", "happy face.png");

    cy.get("#moodImage").should("have.attr", "alt", "Happy Face");

    cy.get("#reasonInput").type("I had a great day!");
    cy.get("#reasonInput").should("have.value", "I had a great day!");

    cy.get("#energyLevel").invoke("val", 80).trigger("input").trigger("change");
    cy.get("#energyLevelValue").should("have.text", "80");

    cy.get("#gratefulInput").type("I am grateful for my family.");
    cy.get("#gratefulInput").should(
      "have.value",
      "I am grateful for my family.",
    );

    cy.get("#goalInput").type("I want to finish my project.");
    cy.get("#goalInput").should("have.value", "I want to finish my project.");

    cy.get("#additionalInput").type("I am feeling good!");
    cy.get("#additionalInput").should("have.value", "I am feeling good!");

    cy.get("#submitButton").click();

    cy.get("#resultsDialog").should("be.visible");
    cy.get("h2").should("contain", "Submission Results");
    cy.get("#score").should("contain", "Your score: 90.00");
    cy.get("#resultsContent").should(
      "contain",
      "Great job! You are doing well. Appreciate the work you have done today and keep it up!",
    );
    cy.get("#closeDialogButton").click();
    cy.get("#resultsDialog").should("not.be.visible");
  });

  it("allows the user to submit the form with a neutral mood", () => {
    cy.get("#neutral").check();
    cy.get("#neutral").should("be.checked");

    cy.get("#moodImage")
      .should("have.attr", "src")
      .and("include", "neutral face.png");

    cy.get("#moodImage").should("have.attr", "alt", "Neutral Face");

    cy.get("#reasonInput").type("It was an average day.");
    cy.get("#reasonInput").should("have.value", "It was an average day.");

    cy.get("#energyLevel").invoke("val", 50).trigger("input").trigger("change");
    cy.get("#energyLevelValue").should("have.text", "50");

    cy.get("#gratefulInput").type("I am grateful for my health.");
    cy.get("#gratefulInput").should(
      "have.value",
      "I am grateful for my health.",
    );

    cy.get("#goalInput").type("I want to go for a walk tomorrow.");
    cy.get("#goalInput").should(
      "have.value",
      "I want to go for a walk tomorrow.",
    );

    cy.get("#additionalInput").type("I am feeling okay.");
    cy.get("#additionalInput").should("have.value", "I am feeling okay.");

    cy.get("#submitButton").click();
    cy.get("#resultsDialog").should("be.visible");
    cy.get("h2").should("contain", "Submission Results");
    cy.get("#score").should("contain", "Your score: 50.00");
    cy.get("#resultsContent").should(
      "contain",
      "Not bad! Keep it up. Remember to take breaks and do something you enjoy to boost your mood and energy.",
    );
    cy.get("#closeDialogButton").click();
    cy.get("#resultsDialog").should("not.be.visible");
  });

  it("allows the user to submit the form with a sad mood", () => {
    cy.get("#sad").check();
    cy.get("#sad").should("be.checked");

    cy.get("#moodImage")
      .should("have.attr", "src")
      .and("include", "sad face.png");

    cy.get("#moodImage").should("have.attr", "alt", "Sad Face");

    cy.get("#reasonInput").type("I had a tough day.");
    cy.get("#reasonInput").should("have.value", "I had a tough day.");

    cy.get("#energyLevel").invoke("val", 20).trigger("input").trigger("change");
    cy.get("#energyLevelValue").should("have.text", "20");

    cy.get("#gratefulInput").type("I am grateful for my friends.");
    cy.get("#gratefulInput").should(
      "have.value",
      "I am grateful for my friends.",
    );

    cy.get("#goalInput").type("I want to relax tomorrow.");
    cy.get("#goalInput").should("have.value", "I want to relax tomorrow.");

    cy.get("#additionalInput").type("I am feeling down.");
    cy.get("#additionalInput").should("have.value", "I am feeling down.");

    cy.get("#submitButton").click();
    cy.get("#resultsDialog").should("be.visible");
    cy.get("h2").should("contain", "Submission Results");
    cy.get("#score").should("contain", "Your score: 10.00");
    cy.get("#resultsContent").should(
      "contain",
      "It seems like you're having a tough day. Consider taking a break or doing something you enjoy.",
    );
    cy.get("#closeDialogButton").click();
    cy.get("#resultsDialog").should("not.be.visible");
  });
});

describe("testing form validation", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("should not allow user to input more than 1000 characters", () => {
    const longText = "a".repeat(1001);

    cy.get("#additionalInput").should("have.attr", "maxlength", "1000");
    cy.get("#additionalInput").type(longText);
    cy.get("#additionalInput")
      .should("have.value", "a".repeat(1000))
      .invoke("val")
      .and("have.length", 1000);
  });

  it("should not allow user to input less than 0 or more than 100 for energy level", () => {
    cy.get("#energyLevel")
      .invoke("val", -10)
      .trigger("input")
      .trigger("change");
    cy.get("#energyLevelValue").should("have.text", "0");
    cy.get("#energyLevel")
      .invoke("val", 110)
      .trigger("input")
      .trigger("change");
    cy.get("#energyLevelValue").should("have.text", "100");
  });
});

describe("testing ui on mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit(url);
  });

  it("should have no horizontal scroll on mobile", () => {
    cy.get("body").should("not.have.css", "overflow-x", "scroll");
  });
});


describe("testing css styles", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("should have the correct background colour", () => {
    cy.get("body").should("have.css", "background-color", "rgb(255, 250, 205)");
  });

  it("should have the correct font family", () => {
    cy.get("body").should("have.css", "font-family", "\"sans-serif\"");
  });

  it("should align the text to the center", () => {
    cy.get("h1").should("have.css", "text-align", "center");
    cy.get("#description").should("have.css", "text-align", "center");
    cy.get("#moodForm").should("have.css", "text-align", "center");
  });

  it("should have italic font style for the description", () => {
    cy.get("#description").should("have.css", "font-style", "italic");
  });

  it("should have the correct border for the mood form", () => {
    cy.get("#moodForm").should("have.css", "border-style", "dotted");
    cy.get("#moodForm").should("have.css", "border-color", "rgb(176, 224, 230)");
  });
});