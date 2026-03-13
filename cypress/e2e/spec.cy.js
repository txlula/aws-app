describe("testing Daily Mood Checker website", () => {
  beforeEach(() => {
    cy.visit("http://mthree-peregrine-s3-3.s3-website-us-east-1.amazonaws.com/lucy");
  });

  it("allows the user to select a happy mood", () => {
    cy.get("#happy").check();
    cy.get("#happy").should("be.checked");
  });

    it("allows the user to select a sad mood", () => {
    cy.get("#sad").check();
    cy.get("#sad").should("be.checked");
  });

    it("allows the user to select a neutral mood", () => {
    cy.get("#neutral").check();
    cy.get("#neutral").should("be.checked");
  });

});
