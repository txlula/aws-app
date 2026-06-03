/// <reference types="cypress" />

describe('Daily Mood Checker - Boundary Testing', () => {
  const BASE_URL =
    'http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy/';

  beforeEach(() => {
    cy.visit(BASE_URL);

    // Ensure core elements are loaded
    cy.get('#moodForm').should('be.visible');
    cy.get('#additionalInput').should('exist');
    cy.get('#energyLevel').should('exist');
  });

  /**
   * Helper: generate string of exact length
   */
  const generateString = (length) => 'A'.repeat(length);

  /**
   * =========================
   * TEXTAREA BOUNDARY TESTS
   * (maxlength = 1000)
   * =========================
   */
  describe('Textarea Boundary Tests (additionalInput - max 1000 chars)', () => {
    it('should accept exactly 999 characters (below boundary)', () => {
      const text = generateString(999);

      cy.get('#additionalInput')
        .clear()
        .type(text, { delay: 0 })
        .should('have.value', text)
        .invoke('val')
        .should('have.length', 999);
    });

    it('should accept exactly 1000 characters (at boundary)', () => {
      const text = generateString(1000);

      cy.get('#additionalInput')
        .clear()
        .type(text, { delay: 0 })
        .invoke('val')
        .should('have.length', 1000);

      cy.get('#additionalInput')
        .should('have.value', text);
    });

    it('should truncate or prevent input beyond 1000 characters (1001 chars)', () => {
      const text = generateString(1001);

      cy.get('#additionalInput')
        .clear()
        .type(text, { delay: 0 });

      cy.get('#additionalInput')
        .invoke('val')
        .then((val) => {
          expect(val.length).to.be.at.most(1000);
        });
    });

    it('should accept empty textarea input (lower boundary)', () => {
      cy.get('#additionalInput')
        .should('have.value', '');

      cy.get('#additionalInput')
        .invoke('val')
        .should('have.length', 0);
    });

    it('should maintain correct maxlength attribute', () => {
      cy.get('#additionalInput')
        .should('have.attr', 'maxlength', '1000');
    });
  });

  /**
   * =========================
   * RANGE INPUT BOUNDARY TESTS
   * (min = 0, max = 100)
   * =========================
   */
  describe('Range Input Boundary Tests (energyLevel)', () => {
    const setRangeValue = (value) => {
      cy.get('#energyLevel')
        .invoke('val', value)
        .trigger('input')
        .trigger('change');
    };

    it('should accept minimum value (0)', () => {
      setRangeValue(0);

      cy.get('#energyLevel')
        .should('have.value', '0');

      cy.get('#energyLevelValue')
        .should('contain.text', '0');
    });

    it('should accept maximum value (100)', () => {
      setRangeValue(100);

      cy.get('#energyLevel')
        .should('have.value', '100');

      cy.get('#energyLevelValue')
        .should('contain.text', '100');
    });

    it('should handle mid-range value (50)', () => {
      setRangeValue(50);

      cy.get('#energyLevel')
        .should('have.value', '50');

      cy.get('#energyLevelValue')
        .should('contain.text', '50');
    });

    it('should clamp or reject value below minimum (-1)', () => {
      setRangeValue(-1);

      cy.get('#energyLevel')
        .invoke('val')
        .then((val) => {
          expect(Number(val)).to.be.at.least(0);
        });
    });

    it('should clamp or reject value above maximum (101)', () => {
      setRangeValue(101);

      cy.get('#energyLevel')
        .invoke('val')
        .then((val) => {
          expect(Number(val)).to.be.at.most(100);
        });
    });

    it('should reflect UI updates when value changes', () => {
      const values = [0, 25, 50, 75, 100];

      values.forEach((val) => {
        setRangeValue(val);

        cy.get('#energyLevelValue')
          .should('contain.text', String(val));
      });
    });

    it('should respect min and max attributes', () => {
      cy.get('#energyLevel')
        .should('have.attr', 'min', '0')
        .and('have.attr', 'max', '100');
    });
  });
});