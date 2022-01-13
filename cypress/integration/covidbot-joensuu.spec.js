describe("When opening corona rokote site", () => {
  it("should be able to reserve time from joensuu", () => {
    // Start from the index page
    cy.visit("https://siunsote.eaika.fi/koronarokote");

    cy.get("button").contains("3. rokotus").click();
    cy.wait(2000);
    cy.get(".vaccineselecthide").within(() => {
      cy.contains("Koronarokote").click();
    });
    cy.get(".vaccineselecthide").within(() => {
      cy.contains("Joensuu Mehiläinen Rantakatu 24, 2krs.").click();
      //cy.contains("Tohmajärvi").click();
    });

    cy.get("#channel_13_426").click();
    cy.get("#channel_13_473").click();

    cy.contains("Ajanvarauskalenteri");
  });
});
