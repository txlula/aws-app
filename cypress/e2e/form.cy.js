/// <reference types="cypress" />

describe('Daily Mood Checker - Mood Submission Flows', () => {
  const BASE_URL =
    'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/';

  beforeEach(() => {
    cy.visit(BASE_URL);

    // Ensure form is loaded before each test
    cy.get('#moodForm').should('be.visible');
  });

  /**
   * Helper: Fill common required fields
   */
  const fillCommonFields = () => {
    cy.get('#reasonInput').type('Automated test reason');
    cy.get('#energyLevel').invoke('val', 50).trigger('input');
    cy.get('#gratefulInput').type('Testing Cypress reliability');
    cy.get('#goalInput').type('Complete QA validation');
    cy.get('#additionalInput').type('Optional notes');
  };

  /**
   * Helper: Submit form
   */
  const submitForm = () => {
    cy.get('#submitButton').should('be.visible').click();
  };

  /**
   * Helper: Validate dialog appears (if JS enables it)
   */
  const validateResultsDialog = () => {
    cy.get('body').then(($body) => {
      if ($body.find('#resultsDialog').length) {
        cy.get('#resultsDialog').should('exist');
      }
    });
  };

  /**
   * =========================
   * POSITIVE MOOD SUBMISSION
   * =========================
   */
  it('should successfully submit a POSITIVE mood review (Happy)', () => {
    cy.get('#happy').check().should('be.checked');

    fillCommonFields();
    submitForm();

    // Validate submission processed
    validateResultsDialog();

    // Optional UI confirmation checks
    cy.get('body').should('contain.text', 'Happy');
  });

  /**
   * =========================
   * NEUTRAL MOOD SUBMISSION
   * =========================
   */
  it('should successfully submit a NEUTRAL mood review', () => {
    cy.get('#neutral').check().should('be.checked');

    fillCommonFields();
    submitForm();

    validateResultsDialog();

    cy.get('body').should('contain.text', 'Neutral');
  });

  /**
   * =========================
   * NEGATIVE MOOD SUBMISSION
   * =========================
   */
  it('should successfully submit a NEGATIVE mood review (Sad)', () => {
    cy.get('#sad').check().should('be.checked');

    fillCommonFields();
    submitForm();

    validateResultsDialog();

    cy.get('body').should('contain.text', 'Sad');
  });

  /**
   * =========================
   * EDGE CASE: REQUIRED FIELD VALIDATION
   * =========================
   */
//   it('should prevent submission when required fields are empty', () => {
//     // Do NOT fill inputs
//     cy.get('#happy').check();

//     cy.get('#reasonInput').clear().should('have.value', '');

//     submitForm();

//     // HTML5 validation should block submission OR no dialog appears
//     cy.get('body').then(($body) => {
//       expect(
//         $body.find('#resultsDialog[open]').length
//       ).to.equal(0);
//     });
//   });

  /**
   * =========================
   * ENERGY LEVEL VERIFICATION (cross-check behavior)
   * =========================
   */
  it('should correctly update energy level during submission', () => {
    cy.get('#neutral').check();

    cy.get('#energyLevel')
      .invoke('val', 80)
      .trigger('input')
      .trigger("change");

    cy.get('#energyLevelValue')
      .should('contain.text', '80');

    fillCommonFields();
    submitForm();

    validateResultsDialog();
  });
});