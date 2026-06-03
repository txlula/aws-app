/// <reference types="cypress" />

describe('Daily Mood Checker - CSS Style Validation', () => {
  const BASE_URL =
    'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/';

  beforeEach(() => {
    cy.visit(BASE_URL);

    // Ensure page loads before style checks
    cy.get('body').should('be.visible');
  });

  /**
   * =========================
   * BODY STYLES
   * =========================
   */
  describe('Body Styles', () => {
    it('should use sans-serif font family', () => {
      cy.get('body')
        .should('have.css', 'font-family')
        .and('match', /sans-serif/i);
    });

    it('should have lemonchiffon background color', () => {
      // lemonchiffon = rgb(255, 250, 205)
      cy.get('body')
        .should('have.css', 'background-color', 'rgb(255, 250, 205)');
    });
  });

  /**
   * =========================
   * HEADING STYLES
   * =========================
   */
  describe('Heading Styles', () => {
    it('should center align h1 text', () => {
      cy.get('h1')
        .should('have.css', 'text-align', 'center');
    });
  });

  /**
   * =========================
   * DESCRIPTION STYLES
   * =========================
   */
  describe('Description Styles', () => {
    it('should center align description text', () => {
      cy.get('#description')
        .should('have.css', 'text-align', 'center');
    });

    it('should render description in italic', () => {
      cy.get('#description')
        .should('have.css', 'font-style', 'italic');
    });
  });

  /**
   * =========================
   * QUESTION CONTAINERS
   * =========================
   */
  describe('Question Container Styles', () => {
    it('should have margin-bottom of 3em (48px)', () => {
      cy.get('.questionContainer').each(($el) => {
        cy.wrap($el)
          .should('have.css', 'margin-bottom', '48px');
      });
    });
  });

  /**
   * =========================
   * QUESTION TEXT
   * =========================
   */
  describe('Question Text Styles', () => {
    it('should have font-size of 18px', () => {
      cy.get('.question').each(($el) => {
        cy.wrap($el)
          .should('have.css', 'font-size', '18px');
      });
    });
  });

  /**
   * =========================
   * MOOD IMAGE CONTAINER
   * =========================
   */
  describe('Mood Image Container Styles', () => {
    it('should have margin-top of 1em (16px)', () => {
      cy.get('.moodImageContainer').each(($el) => {
        cy.wrap($el)
          .should('have.css', 'margin-top', '16px');
      });
    });
  });

  /**
   * =========================
   * INSTRUCTIONS SECTION
   * =========================
   */
  describe('Instructions Styles', () => {
    it('should have width of 90% (computed as percentage)', () => {
      cy.get('#instructions')
        .should('have.css', 'width');
    });

    it('should have margin-bottom of 2em (32px)', () => {
      cy.get('#instructions')
        .should('have.css', 'margin-bottom', '32px');
    });
  });

  /**
   * =========================
   * MOOD FORM STYLES
   * =========================
   */
  describe('Form Styles', () => {
    it('should center text inside form', () => {
      cy.get('#moodForm')
        .should('have.css', 'text-align', 'center');
    });

    it('should have dotted border style', () => {
      cy.get('#moodForm')
        .should('have.css', 'border-style', 'dotted');
    });

    it('should have powderblue border color', () => {
      // powderblue = rgb(176, 224, 230)
      cy.get('#moodForm')
        .should('have.css', 'border-color')
        .and('match', /rgb\(176,\s*224,\s*230\)/);
    });

    it('should have padding-top of 1em (16px)', () => {
      cy.get('#moodForm')
        .should('have.css', 'padding-top', '16px');
    });

    it('should have padding-bottom of 3em (48px)', () => {
      cy.get('#moodForm')
        .should('have.css', 'padding-bottom', '48px');
    });

    it('should be centered using text-align', () => {
      cy.get('#moodForm')
        .should('have.css', 'text-align', 'center');
    });

    it('should have width of 75%', () => {
      cy.get('#moodForm')
        .should('have.css', 'width');
    });
  });

  /**
   * =========================
   * MOOD IMAGE STYLES
   * =========================
   */
  describe('Mood Image Styles', () => {
    it('should have width of 30% (computed value)', () => {
      cy.get('#moodImage')
        .should('have.css', 'width');
    });
  });

  /**
   * =========================
   * RESULTS DIALOG STYLES
   * =========================
   */
  describe('Results Dialog Styles', () => {
    it('should have padding-bottom of 2em (32px)', () => {
      cy.get('#resultsDialog')
        .should('have.css', 'padding-bottom', '32px');
    });
  });
});