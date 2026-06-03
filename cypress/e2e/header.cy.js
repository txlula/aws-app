/// <reference types="cypress" />

describe('Daily Mood Checker - Header Section Tests', () => {
  const BASE_URL =
    'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/';

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  /**
   * HEADER CONTENT TESTS
   * Covers: title, h1, description, instructions
   */
  describe('Header Rendering & Visibility', () => {
    it('should load the page successfully and display correct title', () => {
      cy.title().should('eq', 'Daily Mood Checker');
    });

    it('should display the main heading (h1)', () => {
      cy.get('h1')
        .should('be.visible')
        .and('contain.text', 'Daily Mood Checker');
    });

    it('should display the description text under the header', () => {
      cy.get('#description')
        .should('be.visible')
        .and(
          'contain.text',
          'track your daily mood and feelings'
        );
    });

    it('should display the instructions section', () => {
      cy.get('#instructions')
        .should('be.visible')
        .and(($el) => {
          expect($el.text().length).to.be.greaterThan(50);
        });
    });
  });

  /**
   * HEADER STRUCTURE & SEMANTICS
   */
  describe('Header Structure & Layout', () => {
    it('should render header elements in correct order', () => {
      cy.get('h1').should('be.visible');
      cy.get('#description').should('be.visible');
      cy.get('#instructions').should('be.visible');
    });

    it('should ensure instructions contain step-by-step guidance', () => {
      cy.get('#instructions').should(($el) => {
        const text = $el.text();

        expect(text).to.include('Choose your mood');
        expect(text).to.include('Explain your mood');
        expect(text).to.include('Set your energy level');
        expect(text).to.include('Submit your form');
      });
    });
  });

  /**
   * HEADER VISUAL / UX VALIDATION
   */
  describe('Header UX & Readability', () => {
    it('should ensure header elements are readable and not empty', () => {
      cy.get('h1')
        .invoke('text')
        .should('not.be.empty');

      cy.get('#description')
        .invoke('text')
        .should('not.be.empty');

      cy.get('#instructions')
        .invoke('text')
        .should('not.be.empty');
    });

    it('should ensure instructions include emoji support (UX check)', () => {
      cy.get('#instructions').should(($el) => {
        const text = $el.text();

        expect(text).to.match(/😊|🙋‍♀️|🔥|🙏|🎯|💭|✅/);
      });
    });
  });

  /**
   * BASIC RESPONSIVENESS SMOKE CHECK
   */
  describe('Header Responsiveness (Basic)', () => {
    it('should render header correctly on desktop viewport', () => {
      cy.viewport(1280, 720);

      cy.get('h1').should('be.visible');
      cy.get('#description').should('be.visible');
      cy.get('#instructions').should('be.visible');
    });

    it('should render header correctly on mobile viewport', () => {
      cy.viewport('iphone-x');

      cy.get('h1').should('be.visible');
      cy.get('#description').should('be.visible');
      cy.get('#instructions').should('be.visible');
    });
  });

  /**
   * ACCESSIBILITY SMOKE CHECKS
   */
  describe('Header Accessibility Checks', () => {
    it('should ensure heading structure exists', () => {
      cy.get('h1').should('have.length', 1);
    });

    it('should ensure descriptive text is present for users', () => {
      cy.get('#description')
        .should('have.attr', 'id')
        .and('eq', 'description');
    });
  });
});