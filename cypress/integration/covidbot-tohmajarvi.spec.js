describe("When opening corona rokote site", () => {
  it("should be able to reserve time from tohmajarvi", () => {
    // Start from the index page
    cy.visit("https://siunsote.eaika.fi/koronarokote");

    cy.get("button").contains("3. rokotus").click();
    cy.wait(2000);
    cy.get(".vaccineselecthide").within(() => {
      cy.contains("Koronarokote").click();
    });
    cy.get(".vaccineselecthide").within(() => {
      cy.contains("Tohmajärvi").click();
    });

    cy.get("#channel_13_421").click();
    cy.get("#channel_13_469").click();

    cy.contains("Ajanvarauskalenteri");
  });
});
