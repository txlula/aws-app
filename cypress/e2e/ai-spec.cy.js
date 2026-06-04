/// <reference types="cypress" />

describe("Daily Mood Checker Website", () => {
  const BASE_URL =
    "http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/";

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  // ==================================================
  // 1. WEBSITE HEADER TESTS
  // ==================================================

  describe("Website Header", () => {
    it("displays the correct title", () => {
      cy.title().should("eq", "Daily Mood Checker");

      cy.get("h1").should("be.visible").and("have.text", "Daily Mood Checker");
    });

    it("displays the correct description", () => {
      cy.get("#description")
        .should("be.visible")
        .and(
          "contain.text",
          "It is time to track your daily mood and feelings.",
        );
    });
  });

  // ==================================================
  // 2. WEBSITE CONTENT TESTS
  // ==================================================

  describe("Website Content", () => {
    it("displays the page body", () => {
      cy.get("body").should("be.visible");
    });

    it("displays the mood question", () => {
      cy.contains(".question", "How are you feeling today?").should(
        "be.visible",
      );
    });

    it("displays the reason for mood question", () => {
      cy.contains(".question", "What is the reason for your mood?").should(
        "be.visible",
      );
    });

    it("displays the energy level question", () => {
      cy.contains(".question", "What is your energy level today?").should(
        "be.visible",
      );
    });

    it("displays the gratitude question", () => {
      cy.contains(
        ".question",
        "What is something you are grateful for today?",
      ).should("be.visible");
    });

    it("displays the goal question", () => {
      cy.contains(
        ".question",
        "What is something you want to accomplish tomorrow?",
      ).should("be.visible");
    });

    it("displays the additional thoughts question", () => {
      cy.contains(".question", "Any additional ideas or thoughts?").should(
        "be.visible",
      );
    });

    it("displays all six questions", () => {
      cy.get(".question").should("have.length", 6);
    });
  });

  // ==================================================
  // 3. FORM SUBMISSION TESTS
  // ==================================================

  describe("Form Submission", () => {
    const fillRequiredFields = () => {
      cy.get("#reasonInput").type("Automated Cypress test");

      cy.get("#gratefulInput").type("I am grateful for automated testing");

      cy.get("#goalInput").type("Complete Cypress validation");

      cy.get("#additionalInput").type("Additional notes entered by test");
    };

    it("submits a positive review", () => {
      cy.get("#happy").check().should("be.checked");

      fillRequiredFields();

      cy.get("#submitButton").click();

      cy.get("#resultsDialog").should("exist");
    });

    it("submits a neutral review", () => {
      cy.get("#neutral").check().should("be.checked");

      fillRequiredFields();

      cy.get("#submitButton").click();

      cy.get("#resultsDialog").should("exist");
    });

    it("submits a negative review", () => {
      cy.get("#sad").check().should("be.checked");

      fillRequiredFields();

      cy.get("#submitButton").click();

      cy.get("#resultsDialog").should("exist");
    });
  });

  // ==================================================
  // 4. FORM VALIDATION TESTS
  // ==================================================

  describe("Form Validation", () => {
    it("should not allow more than 1000 characters in additional input", () => {
      const longText = "A".repeat(1001);

      cy.get("#additionalInput").type(longText, { delay: 0 });

      cy.get("#additionalInput")
        .invoke("val")
        .then((value) => {
          expect(value.length).to.be.at.most(1000);
        });

      cy.get("#additionalInput").should("have.attr", "maxlength", "1000");
    });

    it("should not allow energy value below 0", () => {
      cy.get("#energyLevel")
        .invoke("val", -1)
        .trigger("input")
        .trigger("change");

      cy.get("#energyLevel")
        .invoke("val")
        .then((value) => {
          expect(Number(value)).to.be.at.least(0);
        });
    });

    it("should not allow energy value above 100", () => {
      cy.get("#energyLevel")
        .invoke("val", 101)
        .trigger("input")
        .trigger("change");

      cy.get("#energyLevel")
        .invoke("val")
        .then((value) => {
          expect(Number(value)).to.be.at.most(100);
        });
    });

    it("should have correct min and max attributes", () => {
      cy.get("#energyLevel")
        .should("have.attr", "min", "0")
        .and("have.attr", "max", "100");
    });
  });

  // ==================================================
  // 5. MOBILE UI TESTS
  // ==================================================

  describe("Mobile Responsiveness", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
      cy.visit(BASE_URL);
    });

    it("should have no horizontal scrolling on mobile", () => {
      cy.window().then((win) => {
        const documentWidth = win.document.documentElement.scrollWidth;

        const viewportWidth = win.document.documentElement.clientWidth;

        expect(documentWidth).to.be.lte(viewportWidth);
      });
    });

    it("should display main content on mobile", () => {
      cy.get("h1").should("be.visible");
      cy.get("#moodForm").should("be.visible");
    });
  });

  // ==================================================
  // 6. CSS STYLE TESTS
  // ==================================================

  describe("CSS Styling", () => {
    it("should have the correct background colour", () => {
      cy.get("body").should(
        "have.css",
        "background-color",
        "rgb(255, 250, 205)",
      ); // lemonchiffon
    });

    it("should use a sans-serif font family", () => {
      cy.get("body")
        .should("have.css", "font-family")
        .and("match", /sans-serif/i);
    });

    it("should align header text to the center", () => {
      cy.get("h1").should("have.css", "text-align", "center");
    });

    it("should align description text to the center", () => {
      cy.get("#description").should("have.css", "text-align", "center");
    });

    it("should apply italic font style to the description", () => {
      cy.get("#description").should("have.css", "font-style", "italic");
    });

    it("should have a dotted border on the mood form", () => {
      cy.get("#moodForm").should("have.css", "border-style", "dotted");
    });

    it("should have a powderblue border colour on the mood form", () => {
      cy.get("#moodForm")
        .should("have.css", "border-color")
        .and("match", /rgb\(176,\s*224,\s*230\)/);
    });
  });
});
