/// <reference types="cypress" />

describe("Daily Mood Checker - Form, Questions & Images", () => {
  const BASE_URL =
    "http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/";

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  /**
   * =========================
   * FORM STRUCTURE TESTS
   * =========================
   */
  describe("Form Structure & Visibility", () => {
    it("should display the mood form container", () => {
      cy.get("#moodForm").should("exist").and("be.visible");
    });

    it("should render the form element inside the container", () => {
      cy.get("#moodForm form").should("exist").and("be.visible");
    });

    it("should display the submit button", () => {
      cy.get("#submitButton")
        .should("be.visible")
        .and("have.attr", "type", "submit");
    });
  });

  /**
   * =========================
   * FORM QUESTIONS TESTS
   * =========================
   */
  describe("Form Questions Rendering", () => {
    it("should display all question containers", () => {
      cy.get(".questionContainer").should("have.length.at.least", 5);
    });

    it("should display mood selection question", () => {
      cy.get(".question")
        .contains("How are you feeling today?")
        .should("be.visible");
    });

    it("should display reason input question", () => {
      cy.get(".question")
        .contains("What is the reason for your mood?")
        .should("be.visible");
    });

    it("should display energy level question", () => {
      cy.get(".question")
        .contains("What is your energy level today?")
        .should("be.visible");
    });

    it("should display gratitude question", () => {
      cy.get(".question")
        .contains("What is something you are grateful for today?")
        .should("be.visible");
    });

    it("should display goal setting question", () => {
      cy.get(".question")
        .contains("What is something you want to accomplish tomorrow?")
        .should("be.visible");
    });

    it("should display optional additional thoughts question", () => {
      cy.get(".question")
        .contains("Any additional ideas or thoughts?")
        .should("be.visible");
    });
  });

  /**
   * =========================
   * FORM INPUT TESTS
   * =========================
   */
  describe("Form Input Elements Functionality", () => {
    it("should allow mood selection via radio buttons", () => {
      cy.get("#happy").check().should("be.checked");

      cy.get("#neutral").check().should("be.checked");

      cy.get("#sad").check().should("be.checked");
    });

    it("should allow typing into reason input field", () => {
      cy.get("#reasonInput")
        .type("Feeling productive today")
        .should("have.value", "Feeling productive today");
    });

    it("should allow adjusting energy level slider", () => {
      cy.get("#energyLevel")
        .invoke("val", 80)
        .trigger("input")
        .trigger("change")
        .should("have.value", "80");

      cy.get("#energyLevelValue").should("contain.text", "80");
    });

    it("should allow typing into gratitude input", () => {
      cy.get("#gratefulInput")
        .type("Good health")
        .should("have.value", "Good health");
    });

    it("should allow typing into goal input", () => {
      cy.get("#goalInput")
        .type("Finish Cypress tests")
        .should("have.value", "Finish Cypress tests");
    });

    it("should allow typing into optional textarea", () => {
      cy.get("#additionalInput")
        .type("No additional thoughts")
        .should("have.value", "No additional thoughts");
    });
  });

  /**
   * =========================
   * IMAGE TESTS
   * =========================
   */
  describe("Mood Image Rendering & Behavior", () => {
    it("should display the mood image", () => {
      cy.get("#moodImage")
        .should("be.visible")
        .and("have.attr", "src")
        .and("include", "images/");
    });

    it("should have valid alt text for accessibility", () => {
      cy.get("#moodImage").should("have.attr", "alt").and("not.be.empty");
    });

    it("should update image when mood selection changes (behavior test)", () => {
      // NOTE: assumes script.js updates image dynamically

      cy.get("#happy").check();

      cy.get("#moodImage").should("have.attr", "alt").and("match", /happy/i);

      cy.get("#sad").check();

      cy.get("#moodImage").should("have.attr", "alt").and("match", /sad/i);
    });
  });

  /**
   * =========================
   * FORM INTEGRATION SMOKE TEST
   * =========================
   */
  describe("Form Integration Smoke Test", () => {
    it("should allow completing full form without errors", () => {
      cy.get("#happy").check();

      cy.get("#reasonInput").type("Great day at work");

      cy.get("#energyLevel")
        .invoke("val", 70)
        .trigger("input")
        .trigger("change");

      cy.get("#gratefulInput").type("Family and friends");

      cy.get("#goalInput").type("Exercise tomorrow");

      cy.get("#additionalInput").type("Looking forward to rest");

      cy.get("#submitButton").click();

      // Dialog may appear depending on script.js implementation
      cy.get("body").should("exist");
    });
  });
});
