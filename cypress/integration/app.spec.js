describe("Navigation", () => {
  it("should navigate to the text tv image page when clicking the button", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('button[data-testid="button"]').click();
  });
});
